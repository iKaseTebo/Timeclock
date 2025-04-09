"use server";
// import { revalidatePath } from "next/cache";
import { clockIn, clockOut } from "@/lib/entries";


export async function clockInAction() {
    "use server";
    const response = await clockIn();
    if (response.error) {
        return {error: response.error, success: false, status: 500};
    }

}

export async function clockOutAction(note: string, taskId: string) {
    "use server";
    const response = await clockOut(note, taskId);
    console.log(response);
    // if (!response) {
    //     return {error: response, success: false, status: 500};
    // } else {
    //     revalidatePath("/");
    //     return {success: true, status: 200};
    // }
}