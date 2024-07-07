"use client";

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

export default function Nav() {
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        setUpProvider();
    }, []);


    return (
        <nav className={"flex-between w-full mb-16 pt-3"}>
            <Link href={"/"} className={"flex gap-2 flex-center"}>
                <Image
                    src={"/assets/images/logo.svg"}
                    alt={"Logo"}
                    width={30}
                    height={30}
                    className={"object-contain"}
                />
                <p className={"logo_text"}>Promptopia</p>
            </Link>

            {/*Desktop Navigation*/}
            <div className={"sm:flex hidden"}>
                {session?.user ? (
                    <div className={"flex gap-3 md:gap-5"}>
                        <Link href={"/create-prompt"} className={"black_btn"}>
                            Create Post
                        </Link>

                        <button type={"button"} onClick={signOut} className={"outline_btn"}>
                            SignOut
                        </button>

                        <Link href={"/profile"}>
                            <Image
                                src={session?.user.image}
                                alt={"profile"}
                                width={37}
                                height={37}
                                className={"rounded-full"}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type={"button"}
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className={"black_btn"}>
                                    SignIn
                                </button>
                            ))}
                    </>
                )}
            </div>
            {/*Mobile navigation*/}
            <div className={"sm:hidden flex relative"}>
                {session?.user ? (
                    <div className={"flex"} onClick={() => setToggleDropdown((prev) => !prev)}>
                        <Image
                            src={session?.user.image}
                            alt={"profile"}
                            width={37}
                            height={37}
                            className={"rounded-full"}
                        />

                        {toggleDropdown && (
                            <div className={"dropdown"}>
                                <Link
                                    href={"/profile"}
                                    onClick={() => {
                                        setToggleDropdown(false);
                                    }}
                                    className={"dropdown_link"}>
                                    My Profile
                                </Link>
                                <Link
                                    href={"/create-prompt"}
                                    onClick={() => {
                                        setToggleDropdown(false);
                                    }}
                                    className={"dropdown_link"}>
                                    Create Prompt
                                </Link>
                                <button type={'button'} onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }} className={"mt-5 w-full black_btn"}>Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type={"button"}
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className={"black_btn"}
                                >
                                    SignIn
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
}
