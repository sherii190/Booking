import './Home.css';
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="header-container">
       
        <div className="header-text">StädaFint AB </div>
        <p className="header-paragraph">"Låt proffisionella göra det smutsiga arbetet så du kan njuta av en stressfri vardag"</p>
      </div>
            <hr />
            <div className='rubrik'>
                <h1>Vad kan vi hjälpa dig med?</h1>
            </div>
            <hr />
            <div className="boxes-container">
                <div className="box">
                    <div className="box-image" style={{ backgroundImage: 'url(/cleaner-floor-polish-washer-wash.jpg)' }}></div>
                    <div className="box-text">
                        <h1>Deep Cleaning Service</h1>
                        <h4></h4>
                        <br />
                        <Button onClick={e => navigate("/Booking")} size='large' >BOOK NOW</Button>
                    </div>
                </div>
                <div className="box">
                    <div className="box-image" style={{ backgroundImage: 'url(/helhets-st%C3%A4dning.jpeg)' }}></div>
                    <div className="box-text">
                        <h1>Allmänt/ alla utrymmen</h1>
                        <h4></h4>
                        <br />
                        <Button onClick={e => navigate("/Booking")} size='large' >BOOK NOW</Button>
                    </div>
                </div>
                <div className="box">
                    <div className="box-image" style={{ backgroundImage: 'url(/vardagsrummet.jpeg)' }}></div>
                    <div className="box-text">
                        <h1>Vardagsrummet</h1>
                        <h4></h4>
                        <br />
                        <Button onClick={e => navigate("/Booking")} size='large' >BOOK NOW</Button>
                    </div>
                </div>
            </div>
            <div className="boxes-container">
                <div className="box">
                    <div className="box-image" style={{ backgroundImage: 'url(/nedladdning.jpeg)' }}></div>
                    <div className="box-text">
                        <h1>Köket</h1>
                        <h4></h4>
                        <br />
                        <Button onClick={e => navigate("/Booking")} size='large' >BOOK NOW</Button>
                    </div>
                </div>
                <div className="box">
                    <div className="box-image" style={{ backgroundImage: 'url(/sovrum%20st%C3%A4dning.jpeg)' }}></div>
                    <div className="box-text">
                        <h1>Sovrum</h1>
                        <h4></h4>
                        <br />
                        <Button onClick={e => navigate("/Booking")} size='large' >BOOK NOW</Button>
                    </div>
                </div>
                <div className="box">
                    <div className="box-image" style={{ backgroundImage: 'url(/f%C3%B6nster.jpeg)' }}></div>
                    <div className="box-text">
                        <h1>Fönsterputtsning</h1>
                        <h4></h4>
                        <br />
                        <Button onClick={e => navigate("/Booking")} size='large' >BOOK NOW</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
