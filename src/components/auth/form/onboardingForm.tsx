"use client";

import { MyImage } from "@/components/style/myImage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { OnboardingSocialMediaValidation, OnboardingValidation } from "@/validation/registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form"
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

type onboardingValidation= z.infer<typeof OnboardingValidation>;

interface OnboardingProps {
  choose : (choose : ChoosePropsOnboarding) => void;
  id  : string
}

export const OnboardingForm = ({
  choose , id
} : OnboardingProps) => {
  const [error , setError] = useState<string | undefined>("");
  const [success , setSuccess] = useState<string | undefined>("");
  const [isPending , startTransition] = useTransition();

  const theme = useTheme();
  const form = useForm<onboardingValidation>({
    resolver : zodResolver(OnboardingValidation),
    defaultValues : {
      phoneNumber : "",
      gender : undefined,
      day : "",
      year : "",
      month : ""
    },
    shouldFocusError : true,
    shouldUnregister : true,
    criteriaMode : "firstError",
    reValidateMode : "onChange",
    mode : "onChange",
  });

  const [files, setFiles] = useState<File[]>([]);
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const className = {
    imageDiv : " size-32 min-h-32 min-w-32 rounded-full",
    image : " rounded-full cursor-pointer",
    imageFormItem : " flex gap-2 items-center",
    imageFormLabel : " flex gap-3 items-center",
    imageFormControlDiv : " flex flex-col",
    imageFormInput : " border-none outline-none bg-transparent",
    imageFormControlSpan : " text-info cursor-pointer",
    // @ts-ignore
    radioGroup : theme === "forest" | theme === "night" && "border-input radio-primary",
    inputs : " w-full md:w-72 bg-base-100",
    selectBirthTrigger : "md:min-w-20 w-24 px-2 bg-base-100 flex justify-between",
  };

  const [selectMonth , setSelectMonth] = useState("");
  const months ={ January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31, September: 30, October: 31, November: 30, December: 31,};
  
  const onSubmit = (value : onboardingValidation) => {
    const validation = OnboardingValidation.safeParse(value);

    if (!validation.success) {
      return setError("All fields are required")
    }

    const {phoneNumber ,image, username , gender , year , month , day} = validation.data;
    const birth_date = new Date(`${year}-${month}-${day}`);
    startTransition(async () => {
      try {
        const res = await invoke<{message : string , success : boolean}>("api_user_update", {
          id , user : {username ,image, phone_number: phoneNumber , gender , birth_date}
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
          choose("socialMedia");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
      <div className=" w-full">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className={cn(className.imageFormItem)}>
            <FormLabel htmlFor="image" className={cn(className.imageFormLabel)}>
              {field.value ? (
                <MyImage src={field.value} className={cn(className.imageDiv)} classname={cn(className.image)} alt='School logo' />
              ) : (
                <MyImage src='/1.jpg' className={cn(className.imageDiv)} classname={cn(className.image)} alt='School logo'/>
              )}
              <span className={cn(className.imageFormControlSpan,)}>Profile image</span>
            </FormLabel>
            <FormControl>
            <div className={cn(className.imageFormControlDiv)}>
              <Input
                disabled={isPending}
                type='file'
                id="image"
                accept='image/*'
                placeholder='Add profile photo'
                className = {cn(className.imageFormInput, " hidden")}
                onChange={(e) => handleImage(e, field.onChange)}
              />
            </div>
            </FormControl>
            <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className=" mt-2 flex gap-2 w-full max-md:flex-col">
        <FormField 
         name="phoneNumber"
         control={form.control}
         render={({field}) => (
          <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
              <Input {...field} disabled={isPending} autoFocus type="number" className={cn(className.inputs)} placeholder="+250 792537274"/>
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <FormField 
         name="username"
         control={form.control}
         render={({field}) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input {...field} disabled={isPending} className={cn(className.inputs)} type="text" placeholder="Username"/>
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
      </div>
      <div className=" mt-2 flex gap-2 md:justify-between w-full">
      <FormField control={form.control}  name="gender" render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Gender</FormLabel>
          <FormControl>
            <RadioGroup disabled={isPending} onValueChange={field.onChange}  defaultValue={field.value} className="flex space-x-1">
              <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                <FormControl>
                  <RadioGroupItem disabled={isPending} className={cn(className.radioGroup)} value="Male" />
                </FormControl>
                <FormLabel className="font-normal">
                  Male
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                <FormControl>
                  <RadioGroupItem disabled={isPending} className={cn(className.radioGroup)} value="Female" />
                </FormControl>
                <FormLabel className="font-normal">
                  Female
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                <FormControl>
                  <RadioGroupItem disabled={isPending} className={cn(className.radioGroup)} value="Other" />
                </FormControl>
                <FormLabel className="font-normal">Other</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
        )}/>
        <div className=" max-md:w-full w-1/2">
          <Label className=" ">
            <span className=" flex justify-start">Birth date</span>
          </Label>
          <div className=' flex gap-1 justify-between flex-row-reverse'>
            {/* day */}
            <FormField control={form.control} name="day" render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-xs flex items-center gap-1 justify-center max-w-12'>Day</FormLabel>
                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={cn(className.selectBirthTrigger)}>
                      <SelectValue className="bg-transparent" placeholder=" day"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={theme} className=' min-h-40 max-h-60'>
                  {[...Array( 31)].map((_, index) => (
                    <SelectItem key={index + 1} value={`${index + 1}`}>
                      {index + 1}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
            {/* month */}
          <FormField control={form.control}  name="month" render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-xs flex items-center gap-1 justify-center max-w-12  min-w-24'>Month</FormLabel>
                <Select 
                 disabled={isPending} 
                 onValueChange={(value) => {
                    field.onChange(value)
                    setSelectMonth(value)
                 }} 
                 defaultValue={field.value}
                 >
                  <FormControl>
                    <SelectTrigger className={cn(className.selectBirthTrigger)}>
                      <SelectValue className="bg-transparent" placeholder={"month"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={theme} className=' min-h-40 max-h-60'>
                    {Object.keys(months).map((items , index) => (
                      <SelectItem key={index + 1} value={items}>
                        {items}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
            {/* year */}
          <FormField control={form.control} name="year" render={({ field }) => (
            <FormItem>
                <FormLabel className=' text-xs flex items-center gap-1 justify-center max-w-12'>Years</FormLabel>
                <Select disabled={isPending} onValueChange={field.onChange} >
                  <FormControl>
                    <SelectTrigger className={cn(className.selectBirthTrigger)}>
                      <SelectValue className=' text-xs placeholder:text-gray-500' placeholder={"Years"}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={theme} className=' text-xs min-h-40 max-h-60'>
                    {[...Array(100)].map((_, index) => (
                      <SelectItem key={2024 - index} value={`${2024 - index}`} defaultValue={`${field.value}`}>
                        {2024 - index}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
          </div>
        </div>
      </div>
       <div className=" mt-2 mb-2 line">
        <FormMessageError message={error}/>
        <FormMessageSuccess message={success}/>
       </div>
       <div>
        <button type="submit" className=" btn btn-info w-full" disabled={isPending}>
        {isPending ? <BeatLoader size={20}/> : "Next" }
        </button>
       </div>
      </form>
    </Form>
  )
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
  const theme = useTheme();

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
  }

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
    </Form>
  )
}
