"use client";

import { MyImage } from "@/components/style/myImage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { OnboardingSocialMediaValidation, OnboardingValidation } from "@/validation/registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormMessageError, FormMessageSuccess } from "./formMessagers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChoosePropsOnboarding } from "@/app/[lang]/auth/onboarding/[onboardingUserId]/page";
import { BsCheck2Circle, BsFacebook, BsInstagram, BsLinkedin, BsSnapchat, BsTwitter, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { PiSnapchatLogoFill } from "react-icons/pi";
import { IoIosWarning } from "react-icons/io";
import { toast } from "@/components/ui/use-toast";
import { invoke } from "@tauri-apps/api/tauri";
import { BeatLoader } from "react-spinners";
import { t_get_user, t_user } from "@/types/user";

type onboardingValidation = z.infer<typeof OnboardingValidation>;
interface OnboardingProps {
  choose: (choose: ChoosePropsOnboarding) => void;
  id: string;
}

export const OnboardingForm = ({
  choose, id
}: OnboardingProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [userResult, setUserResult] = useState<t_get_user | null>(null);
  const [selectMonth, setSelectMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [initialValuesSet, setInitialValuesSet] = useState(false);

  const [u_day , setU_day] = useState<string | undefined>(undefined);
  const [u_month , setU_Mont] = useState<string | undefined>(undefined);
  const [u_year , setU_year] = useState<string | undefined>(undefined);

  const theme = useTheme();
  const form = useForm<onboardingValidation>({
    resolver: zodResolver(OnboardingValidation),
    defaultValues: {
      phoneNumber: "",
      gender: undefined,
      image: "",
      username: "",
      day: "",
      year: "",
      month: ""
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const get_user = async () => {
    try {
      const result = await invoke<t_get_user>('api_user_data_get', { id });
      setUserResult(result);
      setInitialValuesSet(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const formatDate = (DateString : string | undefined) => {
    if (!DateString) return;

    const date = new Date(DateString);

    // Define arrays for month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Extract day, month, and year
    const day = date.getDate(); // Day of the month (1-31)
    const month = monthNames[date.getMonth()]; // Month name (January-December)
    const year = date.getFullYear(); // Full year (e.g., 2024)

    // Set form values
    setU_day(day.toString());
    setU_Mont(month);
    setU_year(year.toString());

    return {day , month , year}
  }

  useEffect(() => {
    get_user();
    formatDate(userResult?.user?.birth_date);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (userResult && initialValuesSet) {
      form.reset({
        phoneNumber: userResult.user?.phone_number || "",
        gender: userResult.user?.gender || undefined,
        image: userResult.user?.image || "",
        username: userResult.user?.username || "",
        day: u_day || "",
        month: u_month ||"",
        year: u_year ||"",
      });
    }
  }, [userResult, initialValuesSet, form, u_day, u_month, u_year]);

  const months = {
    January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
    July: 31, August: 31, September: 30, October: 31, November: 30, December: 31
  };

  const getDaysInMonth = (month: string, year: number): number => {
    const daysInMonthMap: { [key: string]: number } = {
      January: 31,
      February: year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    };
  
    return daysInMonthMap[month] || 0;
  };

  useEffect(() => {
    if (selectMonth && form.getValues("year")) {
      const days = getDaysInMonth(selectMonth, parseInt(form.getValues("year"), 10));
      // Use a more traditional method to create the array of days
      const daysArray = Array.from({ length: days }, (_, index) => index + 1);
      setDaysInMonth(daysArray);
    }
  }, [form, selectMonth]);
  
  

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (value: onboardingValidation) => {
    const validation = OnboardingValidation.safeParse(value);

    if (!validation.success) {
      return setError("All fields are required");
    }

    const { phoneNumber, image, username, gender, year, month, day } = validation.data;
    const birth_date = new Date(`${year}-${month}-${day}`);
    startTransition(async () => {
      try {
        const res = await invoke<{ message: string, success: boolean }>("api_user_update", {
          id, user: { username, image, phone_number: phoneNumber, gender, birth_date }
        });

        if (res.success) {
          toast({
            title: "WOW! Account has been created successfully",
            description: (
              <div className='flex gap-2'>
                <BsCheck2Circle size={20} className='text-success' />
                <span>WOW! Account has been updated!</span>
              </div>
            )
          });
          setSuccess("WOW! Account has been updated!");
          choose("socialMedia");
        } else {
          toast({
            title: "uh oh! something went wrong.",
            description: (
              <div className='flex gap-2'>
                <IoIosWarning size={20} className='text-error' />
                <span>{res.message}</span>
              </div>
            ),
            variant: "destructive",
          });
          setError(res.message);
        }
      } catch (err: any) {
        toast({
          title: "uh oh! something went wrong.",
          description: (
            <div className='flex gap-2'>
              <IoIosWarning size={20} className='text-error' />
              <span>{err.message || err}</span>
            </div>
          ),
          variant: "destructive",
        });
        setError(err.message || err);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className={cn("flex gap-2 items-center")}>
                <FormLabel htmlFor="image" className={cn("flex gap-3 items-center")}>
                  {field.value ? (
                    <MyImage src={field.value} className={cn("size-32 min-h-32 min-w-32 rounded-full")} classname=" rounded-full" alt='Profile' />
                  ) : (
                    <MyImage src={userResult?.user?.image || '/1.jpg'} classname=" rounded-full" className={cn("size-32 min-h-32 min-w-32 rounded-full")} alt='Profile' />
                  )}
                  <span className={cn("text-info cursor-pointer")}>Profile image</span>
                </FormLabel>
                <FormControl>
                  <div className={cn("flex flex-col")}>
                    <Input
                      disabled={isPending}
                      type='file'
                      id="image"
                      accept='image/*'
                      placeholder='Add profile photo'
                      className={cn("border-none outline-none bg-transparent hidden")}
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2 flex gap-2 w-full max-md:flex-col">
          <FormField 
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} autoFocus type="number" className={cn("w-full md:w-72 bg-base-100")} placeholder="+250 792537274" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} className={cn("w-full md:w-72 bg-base-100")} type="text" placeholder="Username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2 flex gap-2 md:justify-between w-full">
          <FormField control={form.control} name="gender" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup disabled={isPending} onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-1">
                  <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                    <FormControl>
                      <RadioGroupItem disabled={isPending} className={cn("border-input radio-primary")} value="Male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                    <FormControl>
                      <RadioGroupItem disabled={isPending} className={cn("border-input radio-primary")} value="Female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                    <FormControl>
                      <RadioGroupItem disabled={isPending} className={cn("border-input radio-primary")} value="Other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="max-md:w-full w-1/2">
            <Label className="">
              <span className="flex justify-start">Birth date</span>
            </Label>
            <div className='flex gap-1 justify-between flex-row-reverse'>
              {/* day */}
              <FormField control={form.control} name="day" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs flex items-center gap-1 justify-center max-w-12'>Day</FormLabel>
                    <Select  onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger disabled={isPending || !selectMonth} className={cn("md:min-w-20 w-24 px-2 bg-base-100 flex justify-between")}>
                          <SelectValue className="bg-transparent" placeholder="Day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent data-theme={theme} className='min-h-40 max-h-60'>
                        {daysInMonth ? daysInMonth.map(day => (
                          <SelectItem key={day} value={`${day}`}>
                            {day}
                          </SelectItem>
                        )) : (
                          <SelectItem value="">
                            Select Month
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              {/* Month */}
              <FormField control={form.control} name="month" render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs flex items-center gap-1 justify-center max-w-12 min-w-24'>Month</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectMonth(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={cn("md:min-w-20 w-24 px-2 bg-base-100 flex justify-between")}>
                        <SelectValue className="bg-transparent" placeholder={"Month"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme} className='min-h-40 max-h-60'>
                      {Object.keys(months).map((item, index) => (
                        <SelectItem key={index + 1} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              {/* year */}
              <FormField control={form.control} name="year" render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs flex items-center gap-1 justify-center max-w-12'>Year</FormLabel>
                  <Select disabled={isPending} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className={cn("md:min-w-20 w-24 px-2 bg-base-100 flex justify-between")}>
                        <SelectValue className='text-xs placeholder:text-gray-500' placeholder={"Year"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme} className='text-xs min-h-40 max-h-60'>
                      {[...Array(100)].map((_, index) => (
                        <SelectItem key={2024 - index} value={`${2024 - index}`} defaultValue={`${field.value}`}>
                          {2024 - index}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>
        </div>
        <div className="mt-2 mb-2 line">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <div>
          <button type="submit" className="btn btn-info w-full" disabled={isPending}>
            {isPending ? <BeatLoader size={20} /> : "Next"}
          </button>
        </div>
      </form>
    </Form>
  );
};

type onboardingSocialMediaValidation = z.infer <typeof OnboardingSocialMediaValidation>;

interface OnboardingSocialMediaProps {
  choose : (choose : ChoosePropsOnboarding) => void;
  id : string;
}
export const OnboardingSocialMediaForm = ({
  choose , id
} : OnboardingSocialMediaProps) => {
  const [error , setError] = useState<string | undefined>("");
  const [success , setSuccess] = useState<string | undefined>("");
  const [isPending , startTransition] = useTransition();
  const [userResult, setUserResult] = useState<t_get_user | null>(null);
  const [initialValuesSet, setInitialValuesSet] = useState(false);

  const get_user = async () => {
    try {
      const result = await invoke<t_get_user>('api_user_data_get', { id });
      setUserResult(result);
      setInitialValuesSet(true);
    } catch (error : any) {
      setError(error.message);
    }
  }

  const form = useForm<onboardingSocialMediaValidation>({
    resolver : zodResolver(OnboardingSocialMediaValidation),
    defaultValues : {
      instagram : "",
      facebook : "",
      whatsapp : "",
      linkedin : "",
      twitter : "",
      snapchat : "",
    }
  });

  useEffect(() => {
    get_user();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (userResult && initialValuesSet) {
      form.reset({
        instagram : userResult.user?.instagram || "",
        facebook : userResult.user?.facebook || "",
        twitter : userResult.user?.twitter || "",
        snapchat : userResult.user?.snapchat || "",
        whatsapp : userResult.user?.whatsapp ? userResult.user?.whatsapp : userResult.user?.phone_number || "",
        linkedin : userResult.user?.linkedin || "",
      })
    }
  },[userResult , initialValuesSet , form])

  const className = {
    form : {
      item : " w-full ",
      label : "flex gap-2",
    },
    input : "w-full bg-base-100",
    div : "flex gap-2 max-md:flex-col w-full mt-2",
    divButtons : " w-full justify-end flex mt-2 gap-2",
    buttons : {
      submit : "btn btn-info",
      skip : "btn btn-neutral",
      back : "btn btn-secondary"
    },
    icons : ""
  };

  const onSubmit = (value : onboardingSocialMediaValidation) => {
    const validation = OnboardingSocialMediaValidation.safeParse(value);

    if (!validation.success) {
      return setError("All fields are required")
    }

    const {facebook , whatsapp , instagram , snapchat , twitter , linkedin} = validation.data;
    startTransition(async () => {
      try {
        const res = await invoke<{message : string , success : boolean}>("api_user_update", {
          id , user : {whatsapp ,instagram, snapchat , twitter , linkedin , facebook}
        });

        if (res.success) {
          toast({
            title : "WOW! Account has been created successfully",
            description: (
              <div className=' flex gap-2'>
                <BsCheck2Circle size={20} className=' text-success'/>
                <span>WOW! Account has been update!</span>
              </div>
            )
          })
          setSuccess("WOW! Account has been update!");
          choose("school");
        } else {
          toast({
            title: "uh oh! some thing went wrong.",
            description: (
            <div className=' flex gap-2'>
              <IoIosWarning size={20} className=' text-error'/>
              <span>{res.message}</span>
            </div>
            ),
              variant: "destructive",
          })
          setError(res.message);
        }
      } catch (err : any) {
        toast({
          title: "uh oh! some thing went wrong.",
          description: (
          <div className=' flex gap-2'>
            <IoIosWarning size={20} className=' text-error'/>
            <span>{err}</span>
          </div>
          ),
            variant: "destructive",
        })
        setError(err);
      }
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <p className=" text-center text-sm text-gray-500">Help get you social account  fi you don&apos;t have account you can skip! 😌</p>
        </div>
        <div className={cn(className.div)}>
          <FormField
           name="instagram"
           control={form.control}
           render ={({field}) => (
            <FormItem className={cn(className.form.item)}>
              <FormLabel className={cn(className.form.label)}> <BsInstagram className={cn(className.icons , "text-error")} size={16}/> Instagram</FormLabel>
              <FormControl>
                <Input autoFocus disabled={isPending} placeholder="your_instagram_username" className={cn(className.input)} type="text" {...field}/>
              </FormControl>
            </FormItem>
           )}
           />
          <FormField
           name="facebook"
           control={form.control}
           render ={({field}) => (
            <FormItem className={cn(className.form.item)}>
              <FormLabel className={cn(className.form.label)}><BsFacebook className={cn(className.icons , "text-info")} size={16}/> Facebook</FormLabel>
              <FormControl>
                <Input disabled={isPending} className={cn(className.input)} placeholder="facebook name" type="text" {...field}/>
              </FormControl>
            </FormItem>
           )}
           />
        </div>
        <div className={cn(className.div)}>
          <FormField
           name="whatsapp"
           control={form.control}
           render ={({field}) => (
            <FormItem className={cn(className.form.item)}>
              <FormLabel className={cn(className.form.label)}> <BsWhatsapp className={cn(className.icons, "text-success")} size={16}/> Whatsapp</FormLabel>
              <FormControl>
                <Input disabled={isPending} className={cn(className.input)} placeholder="+250 792537274" type="number" {...field}/>
              </FormControl>
            </FormItem>
           )}
           />
          <FormField
           name="twitter"
           control={form.control}
           render ={({field}) => (
            <FormItem className={cn(className.form.item)}>
              <FormLabel className={cn(className.form.label)}><BsTwitterX className={cn(className.icons)} size={16}/> Twitter</FormLabel>
              <FormControl>
                <Input disabled={isPending} className={cn(className.input)} placeholder=" twitter username" type="text" {...field}/>
              </FormControl>
            </FormItem>
           )}
           />
        </div>
        <div className={cn(className.div)}>
          <FormField
           name="linkedin"
           control={form.control}
           render ={({field}) => (
            <FormItem className={cn(className.form.item)}>
              <FormLabel className={cn(className.form.label)}> <BsLinkedin className={cn(className.icons , "text-info")} size={16}/> Linkedin</FormLabel>
              <FormControl>
                <Input disabled={isPending} className={cn(className.input)} placeholder="Linkedin username" type="text" {...field}/>
              </FormControl>
            </FormItem>
           )}
           />
          <FormField
           name="snapchat"
           control={form.control}
           render ={({field}) => (
            <FormItem className={cn(className.form.item)}>
              <FormLabel className={cn(className.form.label)}><PiSnapchatLogoFill className={cn(className.icons, " text-yellow-500")} size={16}/> Snapchat</FormLabel>
              <FormControl>
                <Input disabled={isPending} className={cn(className.input)} placeholder=" Snapchat username 🐍" type="text" {...field}/>
              </FormControl>
            </FormItem>
           )}
           />
        </div>
        <div className=" mt-2 mb-2 line">
          <FormMessageError message={error}/>
          <FormMessageSuccess message={success}/>
        </div>
        <div className={cn(className.divButtons)}>
          <button disabled={isPending} type="button" className={className.buttons.back} onClick={()=> choose("userData")}>
            Back
          </button>
          <button disabled={isPending} type="submit" className={className.buttons.submit} >
            {isPending ? <BeatLoader size={20}/> : "Next"}
          </button>
        </div>
      </form>
      <div>
      </div>
    </Form>
  )
}
