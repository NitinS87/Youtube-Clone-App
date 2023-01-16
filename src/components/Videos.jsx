import React from "react";
import { Box, Stack } from "@mui/material";
import { VideoCard, ChannelCard } from "./index";
import Loader from './Loader';

const Videos = ({ videos, direction }) => {
  // console.log(videos);
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="flex-start"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}{" "}
    </Stack>
  );
};

export default Videos;
