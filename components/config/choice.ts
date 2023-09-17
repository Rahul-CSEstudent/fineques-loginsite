interface IChoice {
    title: string,
    page: string
}
const choices:IChoice[] = [
    {
        title: "All Channel Dashboard",
        page: "/dashboard",
    },
    {
        title: "Advisor - Daily Report",
        page: "/dashboard/advisor",
    },
    // {
    //     title: "Master Daily Report",
    //     page: "/dashboard/master",
    // }
]

export {
    choices,
    type IChoice
}