export type Tasks = {

    task_id: number | string,
    Assigned_task: string

}
export type Column = {
    id: number | string,
    title: string,
    Description: Array<Tasks>
}

export type authPayload = {
    email: string,
    password: string
}

export type PayLoad = {
    id: string | number;
    title: string;
    input: string;
}