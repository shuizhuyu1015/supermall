<template>
  <div class="comment-container">
    <div class="comment-title">用户评价</div>
    <div v-if="comments.length">
      <div v-for="(item,index) in comments" :key="index" class="comment-list">
        <div class="comment-user">
          <img :src="item.user.avatar" alt="">
          <div>{{item.user.uname}}</div>
        </div>
        <div v-for="(extra,eIndex) in item.extraInfo" :key="eIndex" class="user-info">{{extra}}</div>
        <div class="comment-content">{{item.content}}</div>
        <div class="comment-bottom">
          <div>{{item.created | formatDate}}</div>
          <div class="comment-style">{{item.style}}</div>
        </div>
        <div class="comment-imgs">
          <img v-for="(imgItem,iIndex) in item.images" :key="iIndex" :src="imgItem" alt="">
        </div>
      </div>
    </div>
    <div v-else class="comment-content">暂无评论</div>
  </div>
</template>

<script>
  import {timestampToTime} from 'common/utils';

  export default {
    name: "DetailComentInfo",
    props: {
      comments: Array
    },
    filters: {
      formatDate(value) {
        return timestampToTime(value);
      }
    }
  }
</script>

<style scoped>
  .comment-container {
    padding: 10px;
    border-bottom: 5px solid #f2f5f8;
  }

  .comment-title{
    font-size: 16px;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 0;
  }

  .comment-list{
    padding: 5px;
  }

  .comment-user{
    display: flex;
    align-items: center;
    padding: 5px 0;
  }
  .comment-user img{
    width: 40px;
    height: 40px;
  }
  .comment-user div {
    font-size: 15px;
    margin-left: 5px;
  }

  .user-info{
    font-size: 13px;
    color: #999999;
  }

  .comment-content{
    font-size: 14px;
  }

  .comment-bottom{
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #999999;
    padding: 5px 0;
  }
  .comment-style{
    margin-left: 20px;
  }

  .comment-imgs{
    display: flex;
    flex-wrap: wrap;
  }
  .comment-imgs img {
    width: 100px;
    height: 100px;
    margin-right: 15px;
    margin-top: 5px;
  }
</style>
