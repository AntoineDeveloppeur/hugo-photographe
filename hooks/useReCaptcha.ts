import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

export default function useReCaptcha() {

    const {executeRecaptcha} = useGoogleReCaptcha();

    useEffect(() => {
        const verifyCallback = async () => {
            if (executeRecaptcha) {
                const token = await executeRecaptcha()
                
            }
        }
        verifyCallback()
    },[])

    const sendTokenToBackend = async (token: string) => {
        await fetch("/api", {
            method : "POST",
            header : {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body : JSON.stringify(token),

        }).then(response) {
            
        }

        
    }
    

}