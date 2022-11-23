import { useEthPrice } from "@components/hooks/useEthPrice";
import { Modal, Button } from "@components/ui/common";
import { useEffect, useState } from "react";

const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
};

const _createFormState = (isDisabled = false, message = "") => ({
  isDisabled,
  message,
});

const createFormState = (
  { price, email, confirmationEmail },
  hasAgreedTOS,
  isNewPurchase
) => {
  if (!price || Number(price) <= 0) {
    return _createFormState(true, "Price is not valid.");
  }

  if (isNewPurchase) {
    if (confirmationEmail.length === 0 || email.length === 0) {
      return _createFormState(true);
    } else if (email !== confirmationEmail) {
      return _createFormState(true, "Email are not matching.");
    }
  }

  if (!hasAgreedTOS) {
    return _createFormState(
      true,
      "You need to agree with terms of service in order to submit the form"
    );
  }

  return _createFormState();
};

export default function OrderModal({
  course,
  onClose,
  onSubmit,
  isNewPurchase,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(defaultOrder);
  const [enablePrice, setEnablePrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);
  const { eth } = useEthPrice();

  useEffect(() => {
    if (!!course) {
      setIsOpen(true);
      setOrder({
        ...defaultOrder,
        price: eth.perItem,
      });
    }
  }, [course]);

  const closeModal = () => {
    setIsOpen(false);
    setOrder(defaultOrder);
    setEnablePrice(false);
    setHasAgreedTOS(false);
    onClose();
  };

  const formState = createFormState(order, hasAgreedTOS, isNewPurchase);

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg font-bold leading-6 text-gray-900 mb-7"
                id="modal-title"
              >
                {course.title}
              </h3>
              <div className="relative mt-1 rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="flex text-xs text-gray-700">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enablePrice}
                        onChange={({ target: { checked } }) => {
                          setOrder({
                            ...order,
                            price: checked ? order.price : eth.perItem,
                          });
                          setEnablePrice(checked);
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>
                      Adjust Price - only when the price is not correct
                    </span>
                  </div>
                </div>
                <input
                  disabled={!enablePrice}
                  value={order.price}
                  onChange={({ target: { value } }) => {
                    if (isNaN(value)) {
                      return;
                    }
                    setOrder({
                      ...order,
                      price: value,
                    });
                  }}
                  type="text"
                  name="price"
                  id="price"
                  className="block p-4 mb-1 border-gray-300 rounded-md shadow-md disabled:opacity-50 w-80 focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price
                  will be lower, order can be declined (+- 2% slipage is
                  allowed)
                </p>
              </div>
              {isNewPurchase && (
                <>
                  <div className="relative mt-2 rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Email</label>
                    </div>
                    <input
                      onChange={({ target: { value } }) => {
                        setOrder({
                          ...order,
                          email: value.trim(),
                        });
                      }}
                      type="email"
                      name="email"
                      id="email"
                      className="block p-4 border-gray-300 rounded-md shadow-md w-80 focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                      placeholder="x@y.com"
                    />
                    <p className="mt-1 text-xs text-gray-700">
                      It&apos;s important to fill a correct email, otherwise the
                      order cannot be verified. We are not storing your email
                      anywhere
                    </p>
                  </div>
                  <div className="relative my-2 rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Repeat Email</label>
                    </div>
                    <input
                      onChange={({ target: { value } }) => {
                        setOrder({
                          ...order,
                          confirmationEmail: value.trim(),
                        });
                      }}
                      type="email"
                      name="confirmationEmail"
                      id="confirmationEmail"
                      className="block p-4 border-gray-300 rounded-md shadow-md w-80 focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                      placeholder="x@y.com"
                    />
                  </div>
                </>
              )}
              <div className="flex mt-5 text-xs text-gray-700">
                <label className="flex items-center mr-2">
                  <input
                    checked={hasAgreedTOS}
                    onChange={({ target: { checked } }) => {
                      setHasAgreedTOS(checked);
                    }}
                    type="checkbox"
                    className="form-checkbox"
                  />
                </label>
                <span>
                  I accept Eincode &apos;terms of service&apos; and I agree that
                  my order can be rejected in the case data provided above are
                  not correct
                </span>
              </div>
              {formState.message && (
                <div className="p-4 my-3 text-sm text-yellow-700 bg-yellow-200 rounded-lg">
                  {formState.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex">
          <Button
            disabled={formState.isDisabled}
            onClick={() => {
              onSubmit(order);
            }}
          >
            Submit
          </Button>
          <Button onClick={closeModal} variant="red">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
