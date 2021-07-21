import axios from "src/configs/axios";

export default {
  all: (options = { params: { status: "published" } }) =>
    axios.get(`/courses`, options).then((res) => res.data), //fetch course yg statu publish doang
  details: (id) => axios.get(`/courses/${id}`).then((res) => res.data),
};

// https://api.bwamicro.com
// https://642f632270e1.ngrok.io
