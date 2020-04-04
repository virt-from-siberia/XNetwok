import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar }
    }
}) => {
    return (
        <div className='profile-top bg-primary p-2'>
            <img className='round-img my-1' src={avatar} alt='' />
            <h1 className='large'>{name}</h1>
            <p className='lead'>
                {status} {company && <span> at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <div className='icons my-1'>
                {/* //NOTE/:  CHECK IF WEBSITE EXIST*/}
                {website && (
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                        <i className='fas fa-globe fa-2x'></i>
                    </a>
                )}

                {/* //NOTE/:  CHECK IF SOCIAL EXIST*/}
                {/* //NOTE/:  Twitter*/}
                {social && social.twitter && (
                    <a
                        href={social.twitter}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <i className='fab fa-twitter fa-2x'></i>
                    </a>
                )}
                {/* //NOTE/:  facebook*/}
                {social && social.facebook && (
                    <a
                        href={social.facebook}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <i className='fab fa-facebook fa-2x'></i>
                    </a>
                )}
                {/* //NOTE/:  linkedin*/}
                {social && social.linkedin && (
                    <a
                        href={social.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <i className='fab fa-linkedin fa-2x'></i>
                    </a>
                )}

                {/* //NOTE/:  youtube*/}
                {social && social.youtube && (
                    <a
                        href={social.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <i className='fab fa-youtube fa-2x'></i>
                    </a>
                )}

                {/* //NOTE/:  instagram*/}
                {social && social.instagram && (
                    <a
                        href={social.instagram}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <i className='fab fa-instagram fa-2x'></i>
                    </a>
                )}

                {/* //NOTE/:  vk*/}
                {social && social.vk && (
                    <a
                        href={social.vk}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <i className='fab fa-vk fa-2x'></i>
                    </a>
                )}

                {/* //NOTE/:  odnoklassniki*/}
                {social && social.odnoklassniki && (
                    <a
                        href={social.odnoklassniki}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <i className='fab fa-odnoklassniki-square fa-2x'></i>
                    </a>
                )}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop;
