"use client";

import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";

import Modal from "./Modal";

const SubscribeModal = () => {
  const subscribeModal = useSubscribeModal();
  const { user } = useUser();

  const onChange = (open) => {
    if (!open) subscribeModal.onClose();
  };

  const content = (
    <div className="text-center">
      <p className="mb-4">Premium features are currently not available.</p>
      <p className="text-sm text-gray-500">
        All music features are free to use!
      </p>
    </div>
  );

  return (
    <Modal
      title="Premium Features"
      description="Enjoy unlimited music streaming"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
