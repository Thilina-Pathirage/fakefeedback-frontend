import { React, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import {
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
function HeroForm() {
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [done, setDone] = useState("");

  const cancelButtonRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const productId = "650c057ccb05fd19fde0ec8b";
  const productCategory = "Gaming";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setBase64Image(base64);
        setFormData({
          ...formData,
          ['productImage']: base64,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    // Trigger a click event on the hidden file input when the button is clicked
    fileInputRef.current.click();
  };

  const successOkay = () => {
    setOpenTwo(false);
    window.location.reload();


  };

  const [formData, setFormData] = useState({
    productId: productId,
    orderId: "",
    productCategory: productCategory,
    reviewerName: "",
    reviewerEmailAddress: "",
    reviewContent: "",
    productImage: base64Image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = () => {
    // Check if any field in formData is null or an empty string
    const isAnyFieldEmpty = Object.values(formData).some((value) =>
      value === null || value === ""
    );
  
    if (isAnyFieldEmpty) {
      setOpenThree(true); // Show the error message
    } else {
      // Make a POST request to the API endpoint
      axios
        .post(
          "https://fakereview.azurewebsites.net/api/Review/add-review",
          formData
        )
        .then((response) => {
          // Handle a successful response, if needed
          console.log("Data posted successfully:",);
          if (response.data.success) {
            setOpenTwo(true);
          } else {
            setErrorMessage(response.data.message)
            setOpen(true);
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error posting data:", error);
        });
    }
  };
  

  return (
    <>
      <div className="mx-auto max-w-7xl flex w-full py-20 items-start border-b-2 border-[#DCDCDC]">
        <div className=" w-[40%]  pt-10  ">
          <div className="text-[32px] w-[90%] text-left font-semibold leading-[40px] pb-5">
            Havic HV G-92 Gamepad
          </div>
          <div className="text-left text-[14px] opacity-50 font-normal pb-5">
            150 Reviews
          </div>
          <div className="text-left text-[24px] leading-[24px] pb-10">
            $192.00
          </div>
          <div className="text-left text-[14px] leading-[21px]">
            <p className="w-[70%]">
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive.
            </p>
          </div>
        </div>
        <div className="w-[60%]  p-10 shadow ">
          <div className="grid grid-cols-12 gap-2  pb-5">
            <div className=" col-span-4">
              <input
                id="email"
                required
                name="reviewerName"
                value={formData.reviewerName}
                onChange={handleChange}
                type="text"
                autocomplete="given-name"
                placeholder="Your Name *"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-[#F5F5F5] p-2  placeholder:text-[16px] placeholder:p-2"
              />
            </div>
            <div className="col-span-4">
              {" "}
              <input
                id="email"
                name="reviewerEmailAddress"
                value={formData.reviewerEmailAddress}
                onChange={handleChange}
                type="email"
                autocomplete="email"
                placeholder="Your Email *"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 bg-[#F5F5F5] p-2  placeholder:text-[16px] placeholder:p-2"
              />
            </div>

            <div className="col-span-4">
              {" "}
              <input
                id="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                type="text"
                autocomplete="text"
                placeholder="Order ID *"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 bg-[#F5F5F5] p-2 placeholder:text-[16px] placeholder:p-2"
              />
            </div>
          </div>

          <div className="pb-5 w-full flex justify-start gap-5">
            <div className="w-1/3">
              <button
                type="button"
                class="text-sm font-semibold leading-6 bg-gray-500 w-[100%] h-[36px] text-[#ffffff]"
                onClick={handleButtonClick}
              >
                Upload Image
              </button>
            </div>
            <div className="pb-3 ">
              {base64Image ? (
                <div className="w-20">
                  <img src={base64Image} alt="Uploaded" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div className="text-left pb-10">
            <textarea
              id="reviewContent"
              name="reviewContent"
              value={formData.reviewContent}
              onChange={handleChange}
              rows="3"
              placeholder="Your Feedback"
              className=" placeholder:text-[16px] placeholder:p-2 block w-full rounded-md border-0  text-gray-900 p-2  shadow-sm bg-[#F5F5F5] placeholder:text-gray-400 sm:text-sm sm:leading-6"
            ></textarea>
          </div>

          <div className=" w-full flex justify-end">
            <div className="flex w-1/4">
              <button
                type="button"
                class="text-sm font-semibold leading-6 bg-[#DB4444] w-[100%]  text-[#ffffff] px-[16px] py-[10px] flex items-center justify-center"
                onClick={handleSubmit}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ////////   Models     ////// */}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Submit Review
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex justify-end	sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-red-700	 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Try again
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* ////////////// */}

      {/* ////////////// */}

      <Transition.Root show={openTwo} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenTwo}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ShieldCheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Submit Review
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Review Submitted Successfully !
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex justify-end	sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-green-700	 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red sm:mt-0 sm:w-auto"
                      onClick={successOkay}
                      ref={cancelButtonRef}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>


      <Transition.Root show={openThree} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenThree}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Submit Review
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            All fields are required!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex justify-end	sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-red-700	 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red sm:mt-0 sm:w-auto"
                      onClick={() => setOpenThree(false)}
                      ref={cancelButtonRef}
                    >
                      Try again
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default HeroForm;
