import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchFromAPI } from "./../utils/fetchFromAPI";
import { Box } from "@mui/material";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [bannerImg, setBannerImg] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        await fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
          setChannelDetail(data?.items[0])
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchVideos = async () => {
      try {
        await fetchFromAPI(
          `search?channelId=${id}&part=snippet&order=date`
        ).then((data) => setVideos(data?.items));
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchBannerImg = async () => {
      try {
        await fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
          setBannerImg(
            data?.items[0]?.brandingSettings?.image?.bannerExternalUrl
          )
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchBannerImg();
    fetchVideos();
    fetchChannelDetails();
  }, [id]);

  // console.log(videos);
  // console.log(channelDetail);
  // console.log(bannerImg);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            backgroundImage: `url(${bannerImg})`,
            zIndex: 10,
            height: "250px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
