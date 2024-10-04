
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { OnboardingSocialMediaValidation, OnboardingValidation } from "@/validation/registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormMessageError, FormMessageSuccess } from "./formMessagers";
import { ChoosePropsOnboarding } from "@/app/[lang]/auth/onboarding/[onboardingUserId]/page";
import { BsCheck2Circle, BsFacebook, BsInstagram, BsLinkedin, BsSnapchat, BsTwitter, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { PiSnapchatLogoFill } from "react-icons/pi";
import { IoIosWarning } from "react-icons/io";
import { toast } from "@/components/ui/use-toast";
import { invoke } from "@tauri-apps/api/tauri";
import { BeatLoader } from "react-spinners";
import { t_get_user, t_user } from "@/types/user";

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
