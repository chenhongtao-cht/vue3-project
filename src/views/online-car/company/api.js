import Request from "@/components/request/index"

const getOnlineCarInfoList = () => Request.get({
    url: "/api/onlineCar/getOnlineCarCompanyInfo",
    showLoading: true,
})
const query = () => Request.get({
    url: "/api/query",
    showLoading: true,
})


export default {
    getOnlineCarInfoList,
    query
}