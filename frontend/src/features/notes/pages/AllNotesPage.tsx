import Footer from "../../../common/components/Footer";
import { Navbar } from "../../../common/components/Navbar";
import AllNotesSection from "../components/AllNotesSection";
import NotesFilterSection from "../components/NotesFilterSidebar";

export default function GetAllNotesPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col gap-7">
        <Navbar/>
          <main className="flex-1">
            <div className="mt-20 px-10 flex gap-12">
              <NotesFilterSection/>
              <AllNotesSection/>
            </div>
              
          </main>
        <Footer/>
        </div>
    </div>
  )
}
