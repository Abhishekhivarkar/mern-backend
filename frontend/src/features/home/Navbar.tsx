export const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between p-3 bg-white text-black">
        <p className="font-bold">Note<span className="">Hub</span></p>
        <div>
          <ul className="flex justify-between gap-6 font-medium">
            <li>Notes</li>
            <li>Category</li>
            <li>Become a seller</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div className="border rounded ">
          <input type="text" placeholder="Search notes..." />
        </div>
      </nav>
    </>
  );
};
