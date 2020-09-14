import React from 'react'
import {User} from '../../../../models/UserModel'

interface Props {
    user: User
}

/**
 * Профиль. Социальные иконки
 * @param user
 */
const SocialIcons: React.FC<Props> = ({user}) => {
    const {profileData} = user

    return (
        <>
            {
                profileData.facebook
                    ? <a href={`https://www.facebook.com/${profileData.facebook}`}
                         target="_blank" rel="noopener noreferrer">
                        <i id="social-fb"
                           className="facebook-icon active-soc"/>
                    </a>
                    : <i className="facebook-icon social"/>
            }

            {
                profileData.instagram
                    ? <a href={`https://www.instagram.com/${profileData.instagram}`}
                         target="_blank" rel="noopener noreferrer">
                        <i id="social-gp"
                           className="instagram-icon active-soc"/>
                    </a>
                    : <i className="instagram-icon social"/>
            }

            {
                profileData.vk
                    ? <a href={`https://www.vk.com/${profileData.vk}`}
                         target="_blank" rel="noopener noreferrer">
                        <i id="social-fb" className="vk-icon active-soc"/>
                    </a>
                    : <i className="vk-icon social"/>
            }

            {
                profileData.twitter
                    ? <a href={`https://www.twitter.com/${profileData.twitter}`}
                         target="_blank" rel="noopener noreferrer">
                        <i id="social-tw"
                           className="twitter-icon active-soc"/>
                    </a>
                    : <i className="twitter-icon social"/>
            }

        </>
    )
}

export default SocialIcons