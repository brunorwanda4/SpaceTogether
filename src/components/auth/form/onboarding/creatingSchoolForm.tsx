"use client";
import { MyImage } from "@/components/style/myImage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { CreateSchoolValidation } from "@/validation/schoolValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectContent } from "@radix-ui/react-select";
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { FormMessageError, FormMessageSuccess } from "../formMessagers";

const CreatingSchoolForm = () => {
  const [isPending , startTransition] = useTransition();
  const [error , setError] = useState<string | undefined>("");
  const [success , setSuccess] = useState<string | undefined>("");

  const theme = useTheme();

  const form = useForm<z.infer <typeof CreateSchoolValidation>>({
    resolver: zodResolver(CreateSchoolValidation),
    defaultValues: {
      name: "",
      username : "",
      email: "",
      phone : "",
      description : "",
      district: "",
      country : "",
      province : "",
    },
    shouldFocusError : true,
    shouldUnregister : true,
    criteriaMode : "firstError",
    reValidateMode : "onChange",
    mode : "onChange"
  });

  const className = {
    input : " bg-base-100 w-96 max-lg:w-full",
    textarea: "bg-base-100",
    nameUsernameDiv : " flex gap-2 mt-2",
    selectItems : "w-1/3",
    selectContent : "w-full bg-base-100",
    selectValue : "w-full bg-base-100",
    selectTrigger : " w-full bg-base-100",
    formControl : "w-full",
  };

  const [selectedProvince, setSelectedProvince] = useState("");
  const provincesAndCities = {
    Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
    Northern: ["Gicumbi", "Musanze", "Rulindo", "Burera", "Gakenke"],
    Southern: ["Huye", "Nyanza", "Muhanga", "Gisagara", "Kamonyi", "Nyamagabe", "Nyaruguru", "Ruhango"],
    Eastern: ["Kayonza", "Nyagatare", "Rwamagana", "Bugesera", "Gatsibo", "Kirehe", "Ngoma"],
    Western: ["Karongi", "Rubavu", "Rusizi", "Ngororero", "Nyabihu", "Nyamasheke", "Rutsiro"]
  };

  const submit = () => {
    setError("");
    setSuccess("");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className={cn(className.nameUsernameDiv)}>
          <FormField
            name="name"
            control={form.control}
            render={(field) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input className={className.input} {...field} placeholder="School name" type="text"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={(field) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input className={className.input} {...field} placeholder="school-username" type="text"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={className.nameUsernameDiv}>
        <FormField
            name="email"
            control={form.control}
            render={(field) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className={className.input} {...field} placeholder="email@gmail.com" type="mail"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={(field) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input className={className.input} {...field} placeholder="Phone number" type="number"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* location */}
        <div className=" flex gap-4 mt-2 w-full">
          <FormField
           name="country"
            control={form.control}
            render={({field}) => (             
              <FormItem className={cn(className.selectItems)}>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl data-theme={theme} className={className.formControl}>
                    <SelectTrigger className={className.selectTrigger}>
                      <SelectValue className={className.selectValue} defaultValue={"Rwanda"} placeholder="Select Country"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={theme} className={cn(className.selectContent)}>
                    <SelectItem value="Rwanda" className=" flex w-full">
                      <div className=" flex gap-2 w-full items-center">
                        <MyImage alt="Rwanda flag icon" className=" size-6" classname=" object-contain" src={"/icons/countries/rwanda.png"}/>
                        Rwanda
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
           name="province"
            control={form.control}
            render={({field}) => (             
              <FormItem className={cn(className.selectItems)}>
                <FormLabel>Province</FormLabel>
                <Select  
                  onValueChange={(value) => {
                    field.onChange(value)
                    setSelectedProvince(value)
                  }}
                  defaultValue="">
                  <FormControl  className={className.formControl}>
                    <SelectTrigger className={className.selectTrigger}>
                      <SelectValue placeholder="Select a province"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={theme} className={cn(className.selectContent)}>
                    {Object.keys(provincesAndCities).map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
           name="province"
            control={form.control}
            render={({field}) => (             
              <FormItem className={cn(className.selectItems)}>
                <FormLabel>District</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl  className={className.formControl}>
                    <SelectTrigger className={cn(className.selectTrigger ,!selectedProvince && " tooltip")} disabled={!selectedProvince} data-tip={cn(!selectedProvince && " Please select province first")} >
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={theme} className={cn(className.selectContent)}>
                    {selectedProvince &&
                    (provincesAndCities as any)[selectedProvince].map((city : string) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" mt-2">
          <FormField
            name="description"
            control={form.control}
            render={(field) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} className={cn(className.textarea)}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormMessageError message={error}/>
        <FormMessageSuccess message={success}/>
        <button className=" mt-2 btn btn-info  w-full">
          Create school
        </button>
      </form>
    </Form>
  )
}

export default CreatingSchoolForm
