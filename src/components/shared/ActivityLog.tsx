import React, { useCallback, useEffect, useRef } from "react";
import arrowIcon from "../../assets/icons/double-arrow.svg";
import { extractTextFromHtml, getDateAndTime } from "../../utils/commonUtils"
import { useAppDispatch, useAppSelector } from "../../hooks";
import ButtonUI from "../ui/ButtonUI";
import { addComment, getActivityLogs } from "../../store/services/ActivityService";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

interface ActivityLogProps {
    isOpen: boolean;
    onClose: () => void;
    doctypeInfo: any;
}

const ActivityLog = ({ isOpen, onClose, doctypeInfo }: ActivityLogProps) => {
    const { dayOfWeek, date, time } = getDateAndTime(doctypeInfo?.creation);
    const { activityList, isLoading } = useAppSelector((state) => state.activityLogs)
    const { userData } = useAppSelector((state) => state.login)
    const formRef = useRef<HTMLFormElement>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) {
            return
        }

        const formData = new FormData(formRef.current);
        const comment = formData.get("add_comment") as string;

        const payload = {
            reference_doctype: doctypeInfo.doctype,
            reference_name: doctypeInfo.name,
            content: comment,
            comment_email: userData?.name,
            comment_by: userData?.name
        }
        console.log(payload)

        try {
            await dispatch(addComment(payload)).unwrap()
            fetchActivityLog();
            toast.success("Comment added")
        } catch (error) {
            toast.error("Failed to add comment")
        }
    }

    const fetchActivityLog = useCallback(() => {
        dispatch(getActivityLogs(doctypeInfo?.name))
    }, [dispatch, doctypeInfo?.name])

    useEffect(() => {
        fetchActivityLog()
    }, [fetchActivityLog])

    if (!isOpen) return null;

    return (

        <div
            className="fixed left-0 top-0 z-50 items-center overflow-x-hidden overflow-y-hidden block w-full backdrop-blur-sm h-screen p-6 bg-gray-800/40"
        >
            <div className="absolute top-0 right-0">
                <div className="flex flex-col gap-8 relative bg-white rounded-s-lg shadow h-screen w-[23rem] lg:w-[28rem]">
                    <div className="flex justify-between items-center border-b px-5 py-5">
                        <p className="text-lg font-bold">Activity logs</p>
                        <button type="button" onClick={onClose} className="p-2 bg-transparent border-none cursor-pointer focus:outline-none cursor-pointer hover:opacity-50" >
                            <img src={arrowIcon} alt="Arrow icon" width={32} height={32} />
                        </button>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 px-5">
                        <div>
                            <label htmlFor="add_comment" className="block text-md font-medium text-gray-700">Add a comment</label>
                            <textarea
                                name="add_comment"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows={4}
                            ></textarea>
                        </div>
                        <ButtonUI buttonName="Comment" size="small" variant="dark" type="submit" />
                    </form>
                    <div className="overflow-y-auto h-[calc(100vh-8rem)]">

                        {isLoading ? <div><Spinner /></div> :
                            <ol className="relative border-s border-gray-200 px-5 ms-10">
                                {activityList.map((item, index) => {
                                    const { dayOfWeek, date, time } = getDateAndTime(item.creation);

                                    return (
                                        <>
                                            <li className="mb-10 ms-3" key={index}>
                                                <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-5 ring-8 ring-white">
                                                    {item.owner.charAt(0).toUpperCase()}
                                                </span>

                                                <h3 className="items-center mb-1 text-md lg:text-lg text-gray-900">
                                                    {item.comment_type === "Label" || item.comment_type === "Comment" ? (
                                                        <>
                                                            <span className="font-semibold">{item.owner} </span>
                                                            {item.comment_type === "Label" && "updated the status to "}
                                                            {item.comment_type === "Comment" && "commented "}
                                                            <span className="font-semibold">{extractTextFromHtml(item.content)}</span>
                                                        </>
                                                    ) : (
                                                        <span className="font-semibold">{extractTextFromHtml(item.content)}</span>
                                                    )}



                                                </h3>

                                                <div className="flex justify-between">
                                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                        {dayOfWeek}, {time}
                                                    </time>
                                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                        {date}
                                                    </time>
                                                </div>
                                            </li>
                                        </>
                                    );
                                })}
                                <li className="mb-10 ms-3" >
                                    <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-5 ring-8 ring-white">
                                        {doctypeInfo?.owner.charAt(0).toUpperCase()}
                                    </span>

                                    <h3 className="items-center mb-1 text-md lg:text-lg text-gray-900">
                                        <p> <span className="font-semibold">{doctypeInfo?.owner} </span>  created this</p>
                                    </h3>

                                    <div className="flex justify-between">
                                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                            {dayOfWeek}, {time}
                                        </time>
                                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                            {date}
                                        </time>
                                    </div>
                                </li>
                            </ol>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ActivityLog;