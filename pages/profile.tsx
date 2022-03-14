import { title } from "process"
import { useContext, useEffect, useState } from "react"
import Header from "../components/Header"
import NftCard from "../components/NftCard"
import { TransactionContext } from "../context/TransactionContext"
import { client } from "../lib/sanityClient"
import { sanityClient } from "../sanity"
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from "react-icons/hi"
import { BsFillShareFill } from 'react-icons/bs'
import ProfileCard from '../components/ProfileCard'


// const style = {
//     wrapper: `overflow-hidden`,
// }


const style = {
    bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-40`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`,
    divider: `border-r-2`,
    title: `text-4xl font-semibold mb-4`,
    createdBy: `text-lg mb-4`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1`,
    description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}


export default function Profile() {

    const { isLoading, currentAccount } = useContext(TransactionContext)
    const [transactionHistory, setTransactionHistory] = useState<any[]>([])
    const [userName, setUserName] = useState()

    useEffect(() => {
        ; (async () => {
            if (!isLoading && currentAccount) {
                const query = `
            *[_type=="users" && _id == "${currentAccount}"] {
              "transactionList": transactions[]->{amount, toAddress, cImg, cName, timestamp, txHash}|order(timestamp desc)
            }
          `

                const clientRes = await client.fetch(query)

                setTransactionHistory(clientRes[0].transactionList)
            }
        })()
    }, [isLoading, currentAccount])

    useEffect(() => {
        if(!currentAccount) return
    
    
        const str1 = currentAccount.slice(0,7)
        const str2 = currentAccount.slice(35)
        const finalStr = str1 + "..." + str2
        setUserName(finalStr)
    
      }, [currentAccount])

    return (

        <div className="overflow-hidden">
            <Header />
            {/* <h1 className="text-lg text-white text-4xl text-center">Profile Page</h1> */}


            <div className={style.bannerImageContainer}>
                <img
                    className={style.bannerImage}
                    src='https://via.placeholder.com/200'
                    alt="banner"
                />

            </div>


            <div className={style.infoContainer}>
                <div className={style.midRow}>
                    <img
                        className={style.profileImg}
                        src='https://via.placeholder.com/200'
                        alt="profile image"
                    />

                </div>

                <div className={style.endRow}>
                    <div className={style.socialIconsContainer}>
                        <div className={style.socialIconsWrapper}>
                            <div className={style.socialIconsContent}>
                                {/* <div className={style.socialIcon}>
                                    <CgWebsite />
                                </div>

                                <div className={style.divider}></div>

                                <div className={style.socialIcon}>
                                    <AiOutlineInstagram />
                                </div>

                                <div className={style.divider}></div> */}

                                <div className={style.socialIcon}>
                                    <BsFillShareFill />
                                </div>

                                <div className={style.divider}></div>

                                <div className={style.socialIcon}>
                                    <HiDotsVertical />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className={style.midRow}>
                    <div className={style.title}>Unnamed</div>

                </div>

                <div className={style.midRow}>
                    <div className="flex items-center border border-grey-100 px-8 py-2 rounded-xl">

                        <img
                            className={style.ethLogo}
                            src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                            alt='eth'
                        />
                        <div className="font-light " >{userName}</div>
                    </div>
                </div>

                {/* <div className={style.midRow}>
                    <div className={style.title}>timestamp</div>
                </div> */}



            </div>

            <div>

                <h2 className='text-2xl text-white font-semibold py-5 pl-20 '>Collected Nfts</h2>
            </div>
            <hr/>
            <br/>

            <div className="flex flex-wrap">
                {transactionHistory &&
                    transactionHistory?.map((transaction, id) => (
                        <ProfileCard 
                            key={id}
                            nftItem={transaction}
                        />


                    ))
                }

            </div>


        </div>
    )
}




// export const getServerSideProps = async () => {
//     const query = ``


//     const items = await sanityClient.fetch(query)

//     if (!items) {
//         return {
//             props: null,
//             notFound: true,
//         }

//     } else {
//         return {
//             props: {

//             },
//         }
//     }
// }