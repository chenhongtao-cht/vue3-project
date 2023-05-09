import Request from "@/components/request/index"

const getOnlineCarInfoList = (data) => Request.post({
    url: "/api/onlineCar/getOnlineCarCompanyInfo",
    showLoading: true,
    data
})

const getOnlineCarInfoByCompanyList = (data) => Request.get({
    url: "/api/onlineCar/getOnlineCarCompanyInfoByCompany",
    showLoading: true,
    data
})


export default {
    getOnlineCarInfoList,
    getOnlineCarInfoByCompanyList
}