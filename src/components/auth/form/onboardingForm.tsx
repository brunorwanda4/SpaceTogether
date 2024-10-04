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
      userType : undefined,
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

  const months = {
    January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
    July: 31, August: 31, September: 30, October: 31, November: 30, December: 31
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
  
    const fileReader = new FileReader();
  
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
  
      // Check if the file is an image
      if (!file.type.includes("image")) return;
  
      // Check if the file size is greater than 2MB (2MB = 2 * 1024 * 1024 bytes)
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return setError("Use other profile image which is not less than 2MB!.");
      }
  
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

    const { phoneNumber, image, username, gender} = validation.data;
    const birth_date = "bujnfjgf";
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

  const profile_image = () => {
    const image = userResult?.user?.image;

    if (Array.isArray(image)) {
        return image[image.length - 1]?.src
        // if image is an array
    } else if (typeof image === "string") {
        return image
    } else {
        return "/1.jpg"
    }
}

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
                    <MyImage src={profile_image()} classname=" rounded-full" className={cn("size-32 min-h-32 min-w-32 rounded-full")} alt='Profile' />
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
        <div className="mt-2 flex gap-2 w-full max-md:flex-col flex-row-reverse">
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
                      <RadioGroupItem disabled={isPending} className={cn("border-input radio-primary" , theme === "light" | theme == "pastel" && "border border-gray-500")} value="Male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                    <FormControl>
                      <RadioGroupItem disabled={isPending} className={cn("border-input radio-primary" , theme === "light" | theme == "pastel" && "border border-gray-500")} value="Female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 flex-col gap-2">
                    <FormControl>
                      <RadioGroupItem disabled={isPending} className={cn("border-input radio-primary", theme === "light" | theme == "pastel" && "border border-gray-500")} value="Other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="max-md:w-full w-1/2">
            <FormField 
              control={form.control}
              name="userType"
              render={({field}) => (
                <FormItem className="">
                  <FormLabel className="">Your type</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger className="bg-base-100">
                        <SelectValue placeholder="Which type are you" className=" placeholder:text-gray-500"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme} className=" bg-base-100">
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="directer">Directer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
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
