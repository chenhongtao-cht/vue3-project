import Request from "@/components/request/index";

export default {
  getImageList(option) { 
    return Request.get({
      url: `/common/images/image/${option.currentPage}/${option.pageSize}`,
    });
  },
}