import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useQuery } from "react-query";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  currentUserContent,
  currentUserFn,
  currenUserDataFn,
} from "@/api/Auth";
import { FaCopy } from "react-icons/fa";

const Certificate = () => {
  const [isCopyIconHovered, setIsCopyIconHovered] = useState(false);

  const { data: userData, isLoading: loadingUserData } = useQuery(
    "currentUser",
    currentUserFn
  );

  const { data: dataIdCurrentUser, isLoading: loadingParticipant } = useQuery(
    ["currentUserData", userData?.peserta?.id],
    () => currenUserDataFn(userData?.peserta?.id)
  );

  const certificateAvailable = dataIdCurrentUser?.Certificate?.url;

  const getFileIdFromUrl = (url) => {
    if (!url) return null;
    const segments = url.split("/");
    return segments[segments.length - 2];
  };

  const createDirectImageUrl = (url) => {
    const fileId = getFileIdFromUrl(url);
    if (!fileId) return null;
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div>
      <Navbar id={userData?.peserta?.id} />
      <div>
        <h1 className="px-6 mt-6 text-5xl font-bold">
          This is your Certificate !
        </h1>
      </div>
      <div className="flex flex-col w-full border-opacity-50">
        {!certificateAvailable && (
          <div className="modal-box bg-warning mt-5">
            <h3 className="font-bold text-xl">
              Sorry, your certificate is not available yet!
            </h3>
            <p className="py-4">Please check back later.</p>
          </div>
        )}

        {certificateAvailable && (
          <>
            <div className="card card-side bg-base-100 shadow-2xl ml-5 mr-5 mt-5 mb-5">
              <div className="card-body flex flex-col items-center justify-center relative">
                <h1 className="card-title text-lg md:text-xl lg:text-2xl xl:text-3xl text-center">
                  Download your certificate here
                </h1>
                <div className="flex items-center justify-center">
                  <a
                    href={dataIdCurrentUser?.Certificate?.url}
                    className="px-7 font-semibold link link-hover text-center max-w-full break-all "
                    style={{ color: "#06476F", fontSize: "0.8rem" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsCopyIconHovered(false)}
                  >
                    {dataIdCurrentUser?.Certificate?.url}
                  </a>
                  <div
                    onMouseEnter={() => setIsCopyIconHovered(true)}
                    onMouseLeave={() => setIsCopyIconHovered(false)}
                  >
                    <CopyToClipboard
                      text={dataIdCurrentUser?.Certificate?.url || ""}
                      onCopy={handleCopy}
                    >
                      <button className="ml-2 cursor-pointer relative">
                        <FaCopy
                          className="text-blue-500"
                          style={{ color: "#06476F" }}
                          onMouseEnter={() => setIsCopyIconHovered(true)}
                          onMouseLeave={() => setIsCopyIconHovered(false)}
                        />
                        {isCopyIconHovered && (
                          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-blue-500 py-1 px-2 rounded text-xs">
                            {copied
                              ? "Copied to Clipboard"
                              : "Copy to Clipboard"}
                          </span>
                        )}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider ml-6 mr-6">OR</div>

            <div className="card shadow-2xl ml-5 mr-5 mb-10 mt-5  bg-base-100">
              <figure className="px-10 pt-10">
                {dataIdCurrentUser?.Certificate?.url && (
                  <a
                    href={dataIdCurrentUser?.Certificate?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={createDirectImageUrl(
                        dataIdCurrentUser?.Certificate?.url
                      )}
                      referrerPolicy="no-referrer"
                      alt="Certificate Preview"
                      className="rounded-xl w-full h-72 object-cover"
                    />
                  </a>
                )}
              </figure>
              <div className="card-body items-center text-center"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Certificate;
