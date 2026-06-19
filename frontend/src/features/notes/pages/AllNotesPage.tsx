import { useState } from "react";
import Footer from "../../../common/components/Footer";
import { Navbar } from "../../../common/components/Navbar";
import AllNotesSection from "../components/AllNotesSection";
import NotesFilterSection from "../components/NotesFilterSidebar";
import { useDebounce } from "../../../common/hooks/useDebounce";

export default function GetAllNotesPage() {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | null>(null);

  const [maxPrice, setMaxPrice] = useState<number | null>(null);


  const deboucedMinPrice = useDebounce(minPrice,900)

  const deboucedMaxPrice= useDebounce(maxPrice,900)
  console.log(minPrice);

  const [isPaid,setIsPaid] = useState<boolean | null>(null)
  
console.log("AllNotesPage isPaid:", isPaid);
  return (
    <div>
      <div className="min-h-screen flex flex-col gap-7">
        <Navbar />
        <main className="flex-1">
          <div className="mt-20 px-10 flex gap-12">
            <NotesFilterSection
              selectedCategory={category}
              onCategoryChange={setCategory}
              selectedMinPrice={minPrice}
              selectedMaxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              selectedIsPaid = {isPaid}
              onChangeIsPaid = {setIsPaid}
            />
            <AllNotesSection
              category={category}
              minPrice={deboucedMinPrice}
              maxPrice={deboucedMaxPrice}
              isPaid = {isPaid}
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
