import loadingVideo from "../../assets/loading.mp4"

export const Loader = () =>{
     return(
        <div className="flex justify-center items-center h-screen">
            <video 
            autoPlay
            loop
            muted
            playsInline
            className="w-32 h-32"
            >
                <source src={loadingVideo} type="video/mp4"/>
            </video>
            </div>
        )
}