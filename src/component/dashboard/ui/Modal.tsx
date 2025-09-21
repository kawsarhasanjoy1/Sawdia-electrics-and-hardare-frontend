import EHForm from "@/component/Form/EHForm";
import EHImageUploader from "@/component/Form/EHImage";
import EHInput from "@/component/Form/EHInput";

interface TModal {
  setIsModalOpen: any;
  updateUser: any;
  user: Record<string, any>;
}
const Modal = ({ setIsModalOpen, updateUser, user }: TModal) => {
  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg w-full max-w-md p-6 relative">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
        <EHForm onsubmit={updateUser} defaultValues={user}>
          <EHInput
            label="Name"
            type="text"
            placeholder="Enter your name"
            name="name"
          />
          <EHInput
            label="Email"
            type="text"
            placeholder="Enter your email"
            name="email"
          />
          <EHImageUploader name="avatar" />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 2000); 
              }}
            >
              Save
            </button>
          </div>
        </EHForm>
      </div>
    </div>
  );
};

export default Modal;
