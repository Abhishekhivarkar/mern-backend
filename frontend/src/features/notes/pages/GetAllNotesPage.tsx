import Footer from "../../../common/components/Footer";
import { Navbar } from "../../../common/components/Navbar";
import NotesFilterSection from "../components/NotesFilterSection";

export default function GetAllNotesPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col gap-7">
        <Navbar/>
          <main className="flex-1">
            <div className="mt-20">
              <NotesFilterSection/>
            </div>
              
          </main>
        <Footer/>
        </div>
    </div>
  )
}
