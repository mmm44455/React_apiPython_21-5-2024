import facebook from '../../../../../accset/img/facebook.png'
import phone from '../../../../../accset/img/phone-call.png'
import tiktok from '../../../../../accset/img/tik-tok.png'
import twitter from '../../../../../accset/img/twitter.png'
import './sytle.css'
export default function LoginFooter(){
    return (
        <>
            <div className="loginFoot">
              <div className="comment"><p>easy tasking management</p></div>
              <div className="icon">
                <a href='https://www.youtube.com/watch?v=QDK3Lreumv4'><img src={facebook} alt=''></img></a>
                <img src={twitter} alt=''></img>
                <img src={tiktok} alt=''></img>
              </div>
              <div className='phone'>
                <img src={phone} alt=''></img>
                <p>027.1284.123</p>
              </div>
            </div>
        </>
    )
}