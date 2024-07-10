import { ChooseTheme } from "@/components/theme/chooseTheme";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      Bruno Rwanda
      <Button className=" btn-warning  btn bg-warning rounded-xl">
        Igihe rwanda
      </Button>
       <ChooseTheme/>
    </div>
  );
}
