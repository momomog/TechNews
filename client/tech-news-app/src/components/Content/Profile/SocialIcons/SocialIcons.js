import React from "react";

export function SocialIcons(props) {
    const user = props.user;

    return (
        <div className="profile-social-icon">
            {
                user.profileData.facebook
                    ? <a href={'https://www.facebook.com/' + user.profileData.facebook}
                         target="_blank" rel="noopener noreferrer">
                        <i id="social-fb"
                           className="fa fa-facebook-square fa-2x social mr-2"/>
                      </a>
                    : <i id="social-fb" className="fa fa-facebook-square fa-2x social mr-2"/>
            }

            {
                user.profileData.instagram
                    ? <a href={'https://www.instagram.com/' + user.profileData.instagram}
                       target="_blank" rel="noopener noreferrer">
                        <i id="social-gp"
                           className="fa fa-instagram fa-2x social mr-2"/>
                      </a>
                    : <i id="social-gp" className="fa fa-instagram fa-2x social mr-2"/>
            }

            {
                user.profileData.vk
                    ? <a href={'https://www.vk.com/' + user.profileData.vk}
                         target="_blank" rel="noopener noreferrer">
                        <i id="social-fb" className="fa fa-vk fa-2x social mr-2"/>
                      </a>
                    : <i id="social-fb" className="fa fa-vk fa-2x social mr-2"/>
            }

            {
                user.profileData.twitter
                    ? <a href={'https://www.twitter.com/' + user.profileData.twitter}
                       target="_blank" rel="noopener noreferrer">
                        <i id="social-tw"
                           className="fa fa-twitter-square fa-2x social mr-2м"/>
                      </a>
                    : <i id="social-tw"
                         className="fa fa-twitter-square fa-2x social mr-2м"/>
            }

        </div>
    )
}