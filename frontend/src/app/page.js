import Image from "next/image";
import ProductShowcase from "./components/ProductShowcase";
import About from "./components/About";
import DairyBlog from "./components/DairyBlog";

export default function Home() {
  return (
   <>
<About/>
   <ProductShowcase/>
   <DairyBlog/>

   
   </>
  );
}
