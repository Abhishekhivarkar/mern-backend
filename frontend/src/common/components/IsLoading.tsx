import loadingVideo from "../../assets/loading1.gif"

export const Loader = () =>{
     return(
        <div className="flex h-screen justify-center items-center">
            <img src={loadingVideo} alt="Loading"  className="size-73"/>
            </div>
        )
}