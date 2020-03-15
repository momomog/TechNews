import React from "react";

export function SocialIcons(props) {
    const profileData = props.profileData

    return (
        <div>
            {
                profileData.facebook
                    ? <a href={'https://www.facebook.com/' + profileData.facebook}
                         target="_blank" rel="noopener noreferrer">
                        <i id="social-fb"
                           className="fa fa-facebook-square fa-2x active-soc mr-2"/>
                      </a>
                    : <i className="fa fa-facebook-square fa-2x social mr-2"/>
            }

            {
                profileData.instagram
                    ? <a href={'https://www.instagram.com/' + profileData.instagram}
                       target="_blank" rel="noopener noreferrer">
                        <i id="social-gp"
                           className="fa fa-instagram fa-2x active-soc mr-2"/>
                      </a>
                    : <i className="fa fa-instagram fa-2x social mr-2"/>
            }

            {
                profileData.vk
                    ? <a href={'https://www.vk.com/' + profileData.vk}
                         target="_blank" rel="noopener noreferrer">
                        <i id="social-fb" className="fa fa-vk fa-2x active-soc mr-2"/>
                      </a>
                    : <i className="fa fa-vk fa-2x social mr-2"/>
            }

            {
                profileData.twitter
                    ? <a href={'https://www.twitter.com/' + profileData.twitter}
                       target="_blank" rel="noopener noreferrer">
                        <i id="social-tw"
                           className="fa fa-twitter-square fa-2x active-soc mr-2м"/>
                      </a>
                    : <i className="fa fa-twitter-square fa-2x social mr-2м"/>
            }

        </div>
    )
}