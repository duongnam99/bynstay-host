import React, {Component, useState, useEffect } from 'react';
import Axios from "axios";
import { stringify } from "querystring";

const Footer = () => {

return (
<footer>
    <div class="simple-footer py-4 mt-5">
        <div class="container">
            <p><a href="/"><img
                        src="/assets/images/logo-byn.png" /></a>
            </p>
            <div class="row">
                <div class="col-12 col-sm-5">
                    <h5>BynStay Minh nam</h5>
                    <p>160 Hoàng Mai - Hà Nội</p>
                    <p>M. 0964 765 727</p>
                    <p>E. &nbsp;<a href="">duongminhnam99@gmail.com</a></p>
                    <div class="border-top d-block d-sm-none pt-3 mt-3"></div>
                </div>
                <div class="col-6 col-sm-2">
                    <h5>Giới thiệu</h5>
                    <p><a href="">Về chúng tôi</a></p>
                    <p><a href="">Liên hệ</a></p>
                    <p><a href=""></a></p>
                </div>
                <div class="col-6 col-sm-3">
                    <h5>Quy định chung</h5>
                    <p><a href="">Quy chế</a></p>
                    <p><a href="">Điều khoản sử dụng</a></p>
                    <p><a href="">Giải quyết khiếu nại</a></p>
                    <p><a href="">Chính sách bảo mật</a></p>
                </div>
                <div class="col-12 col-sm-2">
                    <div class="border-top d-block d-sm-none pt-3 mt-3"></div>
                    <h5>Sơ đồ trang</h5>
                    <p><a href="">Combo</a></p>
                    <p><a href="">Khách sạn</a></p>
                    <p><a href="">Vé máy bay</a></p>
                    <p><a href="">Khuyến mãi</a></p>
                    <p><a href="">TravelBlog</a></p>
                </div>
            </div>
            {/* <div class="row bottom-footer d-flex align-items-center justify-content-between py-2 px-3 px-sm-0">
                <div class="text-uppercase copyright">2020 © WOWHOLIDAY. ALL RIGHTS RESERVED.</div> <a
                    href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=58108" target="_blank"><img alt=""
                        title="" src="https://wowholiday.vn/html-vinpearl/assets/images/icon-bct.png" width="75%"></a>
                <div
                    class="text-right d-flex align-items-center justify-content-center justify-content-lg-end footer-social">
                    <a href="https://www.facebook.com/wowholiday.vn" class="item mr-3" target="_blank"> <i
                            class="fa fa-facebook-square"></i> </a> <a href="" class="item mr-3" target="_blank"> <i
                            class="fa fa-instagram"></i> </a> <a href="" class="item" target="_blank"> <i
                            class="fa fa-youtube-square"></i> </a></div>
            </div> */}
        </div>
    </div>
</footer>
);
};

export default Footer;