import '../css/about.css'

import AboutBG from '../media/about_bg.jpg'

function About() {
    return (
        <div className="about-container">
            <div className="background">
                <img src={AboutBG}/>
                <div className="about-title">
                    Welcome to m.inCharge app !
                </div>
                <div className="about-text">
                The <i>m.inCharge</i> app provides all the necessary information about the available and ready to use charging stations for electric vehicles in Greek area. 
                <br/>As ‘visitor’ you can see all the installed and ready to use charging stations.
                <br/>As ‘user’ you can also send alerts to the admins, if you find any dysfunctional charger or anything that can be considered as a problem. <br />
                <br/>The ‘admins’ are on duty 24/7 for ensuring the optimal functionality of the app.
                <br></br>
                <br></br>
                <i>A map...in charge for your EV !</i> 
                </div>
            </div>
        </div>
    )
}

export default About;