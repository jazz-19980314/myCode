<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="execution">
    <basic-container>
      <el-tabs v-model="status" type="card" @tab-click="handleClickStatus">
        <el-tab-pane name="-1">
          <span slot="label"> <i class="el-icon-s-order"></i> 全部订单 </span>
        </el-tab-pane>
        <el-tab-pane name="0">
          <span slot="label"> <i class="el-icon-tickets"></i> 未报价 </span>
        </el-tab-pane>
        <el-tab-pane name="8">
          <span slot="label"> <i class="el-icon-bank-card"></i> 待付款 </span>
        </el-tab-pane>
        <!-- <el-tab-pane name="9">
          <span slot="label">
            <i class="el-icon-document"></i> 待结算
          </span>
        </el-tab-pane>-->
        <el-tab-pane name="1">
          <span slot="label">
            <i class="el-icon-refrigerator"></i> 待发货
          </span>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label"> <i class="el-icon-truck"></i> 待收货 </span>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label"> <i class="el-icon-document"></i> 已完成 </span>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label"> <i class="el-icon-brush"></i> 待评价 </span>
        </el-tab-pane>
        <el-tab-pane name="5">
          <span slot="label">
            <i class="el-icon-circle-close"></i> 已取消
          </span>
        </el-tab-pane>
      </el-tabs>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getPage"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDel"
        @sort-change="sortChange"
        @search-change="searchChange"
        @date-change="dateChange"
      >
        <template slot-scope="scope" slot="status">
          <div style="text-align: left">
            <div class="grid-content">
              订单状态：
              <el-tag
                :type="
                  scope.row.status == '2' ||
                  scope.row.status == '3' ||
                  scope.row.status == '4'
                    ? 'success'
                    : 'danger'
                "
                effect="dark"
                size="mini"
                >{{ scope.row.statusDesc }}</el-tag
              >
            </div>
            <div class="grid-content">
              支付状态：
              <el-tag
                :type="scope.row.isPay == '1' ? 'success' : 'danger'"
                effect="dark"
                size="mini"
                >{{ scope.row.isPay == "1" ? "已支付" : "未支付" }}</el-tag
              >
            </div>
            <div class="grid-content" v-if="scope.row.appraisesStatus">
              评价状态：
              <el-tag
                :type="scope.row.appraisesStatus != '0' ? 'success' : 'danger'"
                effect="dark"
                size="mini"
              >
                {{
                  scope.row.appraisesStatus == "0"
                    ? "未评价"
                    : scope.row.appraisesStatus == "1"
                    ? "已评价"
                    : scope.row.appraisesStatus == "2"
                    ? "已追评"
                    : ""
                }}
              </el-tag>
            </div>
          </div>
        </template>
        <template slot-scope="scope" slot="orderNoForm">
          <el-table
            :data="[scope.row]"
            border
            style="width: 100%; margin-top: 20px; margin-top: -10px"
          >
            <el-table-column align="center" prop="salesPrice" label="订单来源">
              <template slot-scope="scope">
                <div v-if="scope.row.app">
                  <img
                    v-if="scope.row.app.qrCode"
                    :src="scope.row.app.qrCode"
                    width="100"
                    height="100"
                  />
                  <div>{{ scope.row.app.name }}</div>
                  <div>
                    <el-tag size="mini">{{
                      scope.row.appType == "1" ? "小程序" : ""
                    }}</el-tag>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="orderNo"
              label="订单单号"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="salesPrice"
              label="订单类型"
              width="200"
            >
              <template slot-scope="scope">
                <el-tag>{{
                  scope.row.orderType == "0"
                    ? "普通订单"
                    : scope.row.orderType == "1"
                    ? "砍价订单"
                    : scope.row.orderType == "2"
                    ? "拼团订单"
                    : ""
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              prop="salesPrice"
              label="订单金额"
              width="200"
            >
              <template slot-scope="scope">
                <div>订单金额：￥{{ scope.row.salesPrice }}</div>
                <div>运费金额：+ ￥{{ scope.row.freightPrice }}</div>
                <!-- <div>优惠券抵扣金额：- ￥{{scope.row.paymentCouponPrice}}</div> -->
                <!-- <div>积分抵扣金额：- ￥{{scope.row.paymentPointsPrice}}</div> -->
                <div style="color: red">
                  支付金额：￥{{ scope.row.paymentPrice }}
                </div>
                <!-- <div style="color: red">支付积分：{{scope.row.paymentPoints}}</div> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="paymentType" label="订单状态">
              <template slot-scope="scope">
                <div style="text-align: left">
                  <div class="grid-content">
                    订单状态：
                    <el-tag
                      :type="
                        scope.row.status == '2' ||
                        scope.row.status == '3' ||
                        scope.row.status == '4'
                          ? 'success'
                          : 'danger'
                      "
                      effect="dark"
                      size="mini"
                      >{{ scope.row.statusDesc }}</el-tag
                    >
                  </div>
                  <div class="grid-content">
                    支付状态：
                    <el-tag
                      :type="scope.row.isPay == '1' ? 'success' : 'danger'"
                      effect="dark"
                      size="mini"
                      >{{
                        scope.row.isPay == "1" ? "已支付" : "未支付"
                      }}</el-tag
                    >
                  </div>
                  <div class="grid-content" v-if="scope.row.appraisesStatus">
                    评价状态：
                    <el-tag
                      :type="
                        scope.row.appraisesStatus != '0' ? 'success' : 'danger'
                      "
                      effect="dark"
                      size="mini"
                    >
                      {{
                        scope.row.appraisesStatus == "0"
                          ? "未评价"
                          : scope.row.appraisesStatus == "1"
                          ? "已评价"
                          : scope.row.appraisesStatus == "2"
                          ? "已追评"
                          : ""
                      }}
                    </el-tag>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="deliveryWay" label="配送方式">
              <template slot-scope="scope">
                <div>
                  <el-tag size="mini">{{
                    scope.row.deliveryWay == "1"
                      ? "普通快递"
                      : scope.row.deliveryWay == "2"
                      ? "上门自提"
                      : ""
                  }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="paymentType" label="支付方式">
              <template slot-scope="scope">
                <div>{{ scope.row.$paymentType }}</div>
                <div>
                  <el-tag size="mini">{{
                    scope.row.paymentWay == "2" ? "在线支付" : ""
                  }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="orderTime"
              label="订单时间"
              width="250"
            >
              <template slot-scope="scope">
                <div>创建时间：{{ scope.row.createTime }}</div>
                <div v-if="scope.row.paymentTime">
                  付款时间：{{ scope.row.paymentTime }}
                </div>
                <div v-if="scope.row.deliveryTime">
                  发货时间：{{ scope.row.deliveryTime }}
                </div>
                <div v-if="scope.row.receiverTime">
                  收货时间：{{ scope.row.receiverTime }}
                </div>
                <div v-if="scope.row.closingTime">
                  成交时间：{{ scope.row.closingTime }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="transactionId"
              label="支付流水号"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="userMessage"
              label="买家留言"
            ></el-table-column>
          </el-table>
        </template>
        <template slot-scope="scope" slot="listOrderItemForm">
          <el-table
            :data="scope.row.listOrderItem"
            border
            style="width: 100%; margin-top: 20px; margin-top: -10px"
          >
            <el-table-column
              align="center"
              prop="picUrl"
              label="图片"
              width="120"
            >
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="100" height="100" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="spuName"
              label="商品名"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="specInfo"
              label="规格"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="salesPrice"
              label="商品单价"
              width="100"
            >
              <template slot-scope="scope"
                >￥{{ scope.row.salesPrice }}</template
              >
            </el-table-column>
            <el-table-column
              align="center"
              prop="quantity"
              label="数量"
              width="50"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="salesPriceTotal"
              label="商品总价"
              width="100"
            >
              <template slot-scope="scope"
                >￥{{
                  (scope.row.salesPrice * scope.row.quantity).toFixed(2)
                }}</template
              >
            </el-table-column>
            <el-table-column
              align="center"
              prop="freightPrice"
              label="运费金额"
              width="100"
            >
              <template slot-scope="scope"
                >￥{{ scope.row.freightPrice }}</template
              >
            </el-table-column>
            <!-- <el-table-column
                                align="center"
                                prop="paymentCouponPrice"
                                label="优惠券抵扣金额"
                                width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.paymentCouponPrice}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="paymentPointsPrice"
                                label="积分抵扣金额"
                                width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.paymentPointsPrice}}
                            </template>
            </el-table-column>-->
            <el-table-column
              align="center"
              prop="salesPriceTotal"
              label="支付金额"
              width="80"
            >
              <template slot-scope="scope"
                >￥{{ scope.row.paymentPrice }}</template
              >
            </el-table-column>
            <!-- <el-table-column
                          align="center"
                          prop="salesPriceTotal"
                          label="支付积分"
                          width="80">
                          <template slot-scope="scope">
                            {{scope.row.paymentPoints}}
                          </template>
            </el-table-column>-->
            <el-table-column
              align="center"
              prop="status"
              label="状态"
              width="200"
            >
              <template slot-scope="scope">
                <div class="grid-content" v-if="scope.row.status != '0'">
                  <el-tag
                    type="danger"
                    @click="handleOrderItemStatus(scope.row)"
                    >{{ scope.row.statusDesc }}</el-tag
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template slot-scope="scope" slot="userIdForm">
          <el-table :data="[scope.row.userInfo]" border style="width: 100%">
            <el-table-column align="center" prop="nickName" label="用户名">
              <template slot-scope="scope">
                <el-avatar
                  icon="el-icon-user-solid"
                  :src="scope.row.headimgUrl"
                ></el-avatar>
                <div>{{ scope.row.nickName }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sex" label="性别">
              <template slot-scope="scope">
                <div>
                  {{
                    scope.row.sex == "1"
                      ? "男"
                      : scope.row.sex == "2"
                      ? "女"
                      : "未知"
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="userCode"
              label="用户编号"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="pointsCurrent"
              label="当前积分"
            ></el-table-column>
          </el-table>
        </template>
        <template slot-scope="scope" slot="estimateDeliveryTimeForm">
          <div>
            <avue-input
              :label="scope.column.label"
              v-model="scope.row.estimateDeliveryTime"
              disabled
            ></avue-input>
          </div>
        </template>
        <template slot-scope="scope" slot="quoteClosingDateForm">
          <div>
            <avue-input
              :label="scope.column.label"
              v-model="scope.row.quoteClosingDate"
              disabled
            ></avue-input>
          </div>
        </template>
        <template slot-scope="scope" slot="payClosingDateForm">
          <div>
            <avue-input
              :label="scope.column.label"
              v-model="scope.row.payClosingDate"
              disabled
            ></avue-input>
          </div>
        </template>
        <template slot-scope="scope" slot="remarkInfo1Form">
          <div>
            <avue-input
              :label="scope.column.label"
              v-model="scope.row.remarkInfo1"
              disabled
            ></avue-input>
          </div>
        </template>
        <template slot-scope="scope" slot="dingjinForm">
          <div v-if="scope.row.remarkInfo2">
            {{ JSON.parse(scope.row.remarkInfo2).dingjin + "%" }}
          </div>
        </template>
        <template slot-scope="scope" slot="daikuan1Form">
          <div v-if="scope.row.remarkInfo2">
            {{ JSON.parse(scope.row.remarkInfo2).daikuan1 + "%" }}
          </div>
        </template>
        <template slot-scope="scope" slot="rizhifu1Form">
          <div v-if="scope.row.remarkInfo2">
            {{
              "货到验收合格" +
              JSON.parse(scope.row.remarkInfo2).rizhifu1 +
              "日内支付" +
              JSON.parse(scope.row.remarkInfo2).daikuan2 +
              "%贷款"
            }}
          </div>
        </template>
        <template slot-scope="scope" slot="zibaojinForm">
          <div v-if="scope.row.remarkInfo2">
            {{
              "质保金" +
              JSON.parse(scope.row.remarkInfo2).rizhifu2 +
              "日内支付" +
              JSON.parse(scope.row.remarkInfo2).zibaojin +
              "%"
            }}
          </div>
        </template>
        <template slot-scope="scope" slot="remarksForm">
          <div>
            <avue-input
              :label="scope.column.label"
              v-model="scope.row.remark"
              disabled
            ></avue-input>
          </div>
        </template>
        <template
          slot-scope="scope"
          slot="orderLogisticsForm"
          v-if="scope.row.deliveryWay == '1'"
        >
          <div>
            <el-table
              :data="[scope.row.orderLogistics]"
              border
              style="width: 100%"
            >
              <el-table-column
                align="center"
                prop="userName"
                label="姓名"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="telNum"
                label="电话"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="地址"
              ></el-table-column>
            </el-table>
            <el-card class="box-card">
              <el-timeline
                :reverse="false"
                v-if="
                  scope.row.orderLogistics.listOrderLogisticsDetail.length > 0
                "
              >
                <el-timeline-item
                  v-for="(obj, index) in scope.row.orderLogistics
                    .listOrderLogisticsDetail"
                  :key="index"
                  :timestamp="obj.logisticsTime"
                  >{{ obj.logisticsInformation }}</el-timeline-item
                >
              </el-timeline>
              <el-timeline :reverse="false" v-else>
                <el-timeline-item>暂无物流信息</el-timeline-item>
              </el-timeline>
            </el-card>
          </div>
        </template>
        <template slot-scope="scope" slot="goodsInfo">
          <el-row
            :gutter="10"
            v-for="(item, index) in scope.row.listOrderItem"
            :key="index"
            style="border: 1px solid #eaeaea; padding: 5px"
          >
            <el-col :span="3">
              <img :src="item.picUrl" width="100%" />
            </el-col>
            <el-col :span="13" style="text-align: left">
              <div class="spu-name">
                <el-tag type="danger" v-if="scope.row.orderType != '0'">{{
                  scope.row.orderType == "1"
                    ? "砍价"
                    : scope.row.orderType == "2"
                    ? "拼团"
                    : ""
                }}</el-tag>
                {{ item.spuName }}
              </div>
              <div class="spec-info">{{ item.specInfo }}</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content" style="color: red">
                ￥{{ item.paymentPrice
                }}{{
                  item.paymentCouponPrice
                    ? " + 优惠券￥" + item.paymentCouponPrice
                    : ""
                }}{{ item.paymentPoints ? " + 积分" + item.paymentPoints : "" }}
              </div>
              <div class="grid-content">×{{ item.quantity }}件</div>
              <div class="grid-content" v-if="item.status != '0'">
                <el-tag type="danger" @click="handleOrderItemStatus(item)">{{
                  item.statusDesc
                }}</el-tag>
              </div>
              <div
                class="grid-content"
                v-if="
                  item.status == '0' &&
                  scope.row.isPay == '0' &&
                  !scope.row.status
                "
              >
                <el-tag type="danger" @click="handleEditPrice(item)"
                  >改价</el-tag
                >
              </div>
            </el-col>
          </el-row>
        </template>
        <template slot-scope="scope" slot="createTime">
          <div>
            <div class="grid-content">{{ scope.row.createTime }}</div>
            <div class="grid-content">{{ scope.row.orderNo }}</div>
          </div>
        </template>
        <template slot-scope="scope" slot="salesPrice">
          <div style="text-align: left">
            <div class="grid-content">
              订单金额：￥{{ scope.row.salesPrice }}
            </div>
            <div class="grid-content">
              运费金额：+ ￥{{ scope.row.freightPrice }}
            </div>
            <!-- <div class="grid-content">优惠券抵扣金额：- ￥{{scope.row.paymentCouponPrice}}</div> -->
            <!-- <div class="grid-content">积分抵扣金额：- ￥{{scope.row.paymentPointsPrice}}</div> -->
            <div class="grid-content" style="color: red">
              支付金额：￥{{ scope.row.paymentPrice }}
            </div>
            <!-- <div class="grid-content" style="color: red">支付积分：{{scope.row.paymentPoints}}</div> -->
          </div>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            icon="el-icon-edit"
            size="small"
            type="text"
            v-if="permissions['mall:orderinfo:get']"
            @click="openView(scope.row, scope.index)"
            >订单详情</el-button
          >
          <el-button
            icon="el-icon-document-add"
            size="small"
            type="text"
            v-if="permissions['mall:orderinfo:get'] && scope.row.status == '0'"
            @click="questionPriceN(scope.row, scope.index)"
            >立即报价</el-button
          >
          <el-button
            icon="el-icon-edit-outline"
            size="small"
            type="text"
            v-if="permissions['mall:orderinfo:get'] && scope.row.status == '8'"
            @click="changeQuestionPrice(scope.row, scope.index)"
            >修改报价</el-button
          >
          <el-button
            icon="el-icon-position"
            size="small"
            type="text"
            v-if="
              permissions['mall:orderinfo:edit'] &&
              scope.row.deliveryWay == '1' &&
              scope.row.status == '1'
            "
            @click="showDialogLogistics(scope.row, scope.index)"
            >发货</el-button
          >
          <el-button
            icon="el-icon-suitcase-1"
            size="small"
            type="text"
            v-if="permissions['mall:orderinfo:get'] && scope.row.status != '0'"
            @click="moneyDeclre(scope.row)"
            >资金结算</el-button
          >
          <el-button
            icon="el-icon-position"
            size="small"
            type="text"
            v-if="
              permissions['mall:orderinfo:edit'] &&
              scope.row.deliveryWay == '2' &&
              scope.row.status == '1'
            "
            @click="takeGoods(scope.row, scope.index)"
            >提货</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="small"
            type="text"
            v-if="
              permissions['mall:orderinfo:edit'] &&
              scope.row.isPay == '0' &&
              !scope.row.status
            "
            @click="orderCancel(scope.row, scope.index)"
            >取消</el-button
          >
        </template>
      </avue-crud>
      <el-dialog
        title="立即报价"
        :visible.sync="dialogQuestionPrice"
        width="32%"
        center
      >
        <div class="quesPrice" v-for="(item, index) in quesList" :key="index">
          <div
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            材料名称：
            <span>{{ item.spuName }}</span>
          </div>
          <div class>
            规格型号：
            <span>{{ item.specInfo ? item.specInfo : "无规格" }}</span>
          </div>
          <div class>
            需求数量：
            <span>{{ item.quantity }}</span>
          </div>
          <div style="position: relative">
            <strong style="color: red; position: absolute; top: 5px; left: -8px"
              >*</strong
            >销售价格：
            <input
              type="text"
              name="prcie"
              id="prcie"
              value="item.salesPrice"
              placeholder="请输入您的销售价格（单价/元)"
              v-model="item.salesPrice"
            />
          </div>
          <div>
            商品备注：
            <input
              type="text"
              name="remark"
              id="remark"
              value="item.remark"
              placeholder="请输入您的商品备注"
              v-model="item.remark"
            />
          </div>
        </div>
        <div style="margin: 15px 0">订单留言：{{ userMessage }}</div>
        <div style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="quesPriceNow" size="mini"
            >立即报价</el-button
          >
        </div>
      </el-dialog>
      <!-- 修改报价 -->
      <el-dialog
        title="修改报价"
        :visible.sync="dialogChangeQuestionPrice"
        width="32%"
        center
      >
        <div class="quesPrice" v-for="(item, index) in quesList" :key="index">
          <div
            class
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            材料名称：
            <span>{{ item.spuName }}</span>
          </div>
          <div class>
            规格型号：
            <span>{{ item.specInfo ? item.specInfo : "无规格" }}</span>
          </div>
          <div class>
            需求数量：
            <span>{{ item.quantity }}</span>
          </div>
          <div style="position: relative">
            <strong style="color: red; position: absolute; top: 5px; left: -8px"
              >*</strong
            >销售价格：
            <input
              type="text"
              name="prcie"
              id="prcie"
              value="item.salesPrice"
              placeholder="请输入您的销售价格（单价/元)"
              v-model="item.salesPrice"
            />
          </div>
          <div>
            商品备注：
            <input
              type="text"
              name="remark"
              id="remark"
              value="item.remark"
              placeholder="请输入您的商品备注"
              v-model="item.remark"
            />
          </div>
        </div>
        <div style="margin: 15px 0">订单留言：{{ userMessage }}</div>
        <div style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="quesPriceChange" size="mini"
            >修改报价</el-button
          >
        </div>
      </el-dialog>
      <!-- 报价信息选择 -->
      <el-dialog
        title="报价信息选择"
        :visible.sync="dialogOfferSelect"
        width="30%"
        center
      >
        <avue-form
          :option="OfferSelectOption"
          v-model="OfferSelectForm"
          @submit="OfferSelect"
        ></avue-form>
      </el-dialog>
      <!-- 资金结算 -->
      <el-dialog
        title="资金结算"
        :visible.sync="dialogMoneyDeclre"
        width="30%"
        center
      >
        <!-- <avue-form :option="moneyDeclreOption" v-model="moneyDeclreForm" @submit="subMoneyDeclre">
        </avue-form>-->
        <div class="moneyDeclre">
          <div class="title">
            <span>共{{ total }}笔交易记录</span>
          </div>
          <div class="declreAll">
            <el-button type="primary" @click="downloadContract()"
              >下载合同</el-button
            >
            <el-button
              type="primary"
              @click="declreAll(moneyDeclreList[0].orderNo)"
              >全额结清</el-button
            >
          </div>
          <div
            class="order-con"
            v-for="(item, index) in moneyDeclreList"
            :key="index"
          >
            <div class>{{ item.createTime }}</div>
            <div class="order-det">
              <div class="order-main">
                <div class="order-price">
                  <span>订单总额</span>
                  <span>￥{{ item.paymentPrice }}</span>
                </div>
                <div class="order-price">
                  <span>未结款金额</span>
                  <span>￥{{ item.paymentPriceCurrent }}</span>
                </div>
                <div class="order-price">
                  <span>本次结款金额</span>
                  <span>￥{{ item.payPrice }}</span>
                </div>
                <div
                  class="order-price order-image"
                  style="align-items: flex-start"
                >
                  <span>凭证信息</span>
                  <div class="pingImg">
                    <img
                      v-for="(imgUrl, index) in item.picUrl"
                      :key="index"
                      :src="imgUrl"
                      alt=""
                      @click="openPreview(imgUrl)"
                    />
                  </div>
                </div>
                <div class="order-btn" v-if="item.status == 0">
                  <el-button type="danger" @click="refuse(index)"
                    >拒绝</el-button
                  >
                  <el-button type="primary" @click="confirm(index)"
                    >确认</el-button
                  >
                </div>
                <div class="order-btn" v-if="item.status == 1">
                  <el-button type="primary">已确认</el-button>
                </div>
                <div class="order-btn" v-if="item.status == 2">
                  <el-button type="danger">已拒绝</el-button>
                </div>
                <div class="order-beizhu">
                  备注：{{ item.reason ? item.reason : "无" }}
                </div>
                <div class="order-beizhu">
                  注：7天内未确认信息，系统将自动为您确认
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 发货 -->
      <el-dialog title="发货" :visible.sync="dialogLogistics" width="30%">
        <avue-form
          :option="logisticsOption"
          v-model="logisticsForm"
          @submit="delivery"
        >
          <template slot="group1Header">
            <h4 @click="handelChange(1)">普通快递</h4>
          </template>
          <template slot="group2Header">
            <h4 @click="handelChange(2)">专业物流</h4>
          </template>
        </avue-form>
      </el-dialog>
      <el-dialog title="退款管理" :visible.sync="dialogRefunds" width="40%">
        <el-card>
          <div slot="header">
            <span>退款信息</span>
          </div>
          <el-row :gutter="10" style="border: 1px solid #eaeaea; padding: 5px">
            <el-col :span="3">
              <img :src="orderItemObj.picUrl" width="100%" />
            </el-col>
            <el-col :span="13" style="text-align: left">
              <div class="spu-name">{{ orderItemObj.spuName }}</div>
              <div class="spec-info">{{ orderItemObj.specInfo }}</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">￥{{ orderItemObj.salesPrice }}</div>
              <div class="grid-content">×{{ orderItemObj.quantity }}件</div>
            </el-col>
          </el-row>
          <div style="margin-top: 20px">
            退款状态：
            <el-tag
              type="danger"
              size="small"
              v-if="orderItemObj.listOrderRefunds"
              >{{ orderItemObj.listOrderRefunds[0].statusDesc }}</el-tag
            >
          </div>
          <div style="margin-top: 20px">
            是否退款：
            <el-tag
              :type="orderItemObj.isRefund == '1' ? 'success' : 'danger'"
              size="small"
              >{{ orderItemObj.isRefund == "1" ? "是" : "否" }}</el-tag
            >
            <el-tooltip
              style="margin-left: 10px"
              effect="dark"
              content="“是”则代表退款金额已成功到达用户账上"
              placement="top-start"
            >
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
          <div style="margin-top: 20px">
            商品数量：x{{ orderItemObj.quantity }}
          </div>
          <div style="margin-top: 20px">
            订单金额：￥{{
              (orderItemObj.quantity * orderItemObj.salesPrice).toFixed(2)
            }}
          </div>
          <div style="margin-top: 20px">
            运费金额：￥{{ orderItemObj.freightPrice }}
          </div>
          <div
            style="margin-top: 20px; color: red"
            v-if="orderItemObj.listOrderRefunds"
          >
            退款金额：￥{{ orderItemObj.listOrderRefunds[0].refundAmount }}
          </div>
          <div style="margin-top: 20px; color: red">
            退款积分：{{ orderItemObj.paymentPoints }}
          </div>
          <div style="margin-top: 20px" v-if="orderItemObj.listOrderRefunds">
            退款原因：{{ orderItemObj.listOrderRefunds[0].refundReson }}
          </div>
          <div style="margin-top: 20px" v-if="orderItemObj.listOrderRefunds">
            拒绝原因：{{ orderItemObj.listOrderRefunds[0].refuseRefundReson }}
          </div>
        </el-card>
        <el-card
          style="margin-top: 10px"
          v-if="orderRefundsStatusList.length > 0"
        >
          <div slot="header">
            <span>退款操作</span>
          </div>
          <el-form
            ref="orderRefunds"
            :model="orderRefunds"
            :rules="orderRefundsRules"
            label-width="80px"
          >
            <el-form-item label="退款状态" prop="status">
              <el-select v-model="orderRefunds.status" placeholder="请选择">
                <el-option
                  v-for="item in orderRefundsStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="拒绝原因"
              prop="refuseRefundReson"
              v-if="
                orderRefunds.status == '12' ||
                orderRefunds.status == '22' ||
                orderRefunds.status == '212'
              "
            >
              <el-input
                type="textarea"
                v-model="orderRefunds.refuseRefundReson"
                placeholder="请填写拒绝原因"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                v-loading="orderRefundsSubmitLoading"
                @click="orderRefundsSubmit(orderItemObj.listOrderRefunds[0])"
                >确认提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import {
  getPage,
  getObj,
  addObj,
  putObj,
  delObj,
  editPrice,
  orderCancel,
  takeGoods,
  questionPrice,
  getOneObj,
  getMoneyDeclre,
  puthistoryment,
  declreAll,
} from "@/api/mall/orderinfo";
import { getObj as getOrderItem } from "@/api/mall/orderitem";
import { doOrderRefunds } from "@/api/mall/orderrefunds";
import { getObj as getWxUser } from "@/api/wxmp/wxuser";
import { tableOption } from "@/const/crud/mall/orderinfo";
import { mapGetters } from "vuex";
const DIC = [
  {
    label: "不开票",
    value: "1",
  },
  {
    label: "增值税普通发票",
    value: "2",
    children: [
      {
        label: "3%",
        value: "23",
      },
      {
        label: "9%",
        value: "29",
      },
      {
        label: "13%",
        value: "213",
      },
    ],
  },
  {
    label: "增值税专业发票",
    value: "3",
    children: [
      {
        label: "3%",
        value: "33",
      },
      {
        label: "9%",
        value: "39",
      },
      {
        label: "13%",
        value: "313",
      },
    ],
  },
];
export default {
  name: "orderinfo",
  data() {
    return {
      date: [],
      status: "-1",
      tableData: [],
      quesList: [], //报价详情
      salesPrice: [], //销售价格
      remark: [], //商品备注
      userMessage: "", //订单留言
      changeState: 1, //选项卡切换
      moneyDeclreList: [], //结款详情
      total: "", //交易次数
      picUrl: [], //凭证信息
      contract: [], //訂單詳情
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
        ascs: [], //升序字段
        descs: "create_time", //降序字段
      },
      paramsSearch: {},
      tableLoading: false,
      tableOption: tableOption,
      //立即报价
      dialogQuestionPrice: false,
      dialogChangeQuestionPrice: false,
      dialogOfferSelect: false,
      //发货
      dialogLogistics: false,
      //资金结算
      dialogMoneyDeclre: false,
      moneyDeclreForm: {
        row: {},
      },
      logisticsForm: {
        row: {},
        logistics: null,
        logisticsNo: null,
        address: null,
      },
      //报价选择
      OfferSelectForm: {
        row: {},
        estimateDeliveryTime: null,
        payClosingDate: null,
        quoteClosingDate: null,
        cascader: [],
        dingjin: null,
        daikuan1: null,
        rizhifu1: null,
        daikuan2: null,
        zibaojin: null,
        rizhifu2: null,
        remark: null,
      },
      form: {
        text1: 0,
      },
      logisticsOption: {
        tabs: true,
        emptyBtn: false,
        card: true,
        column: [
          {
            label: "收货人名字",
            prop: "userName",
            span: 24,
            readonly: true,
          },
          {
            label: "电话号码",
            prop: "telNum",
            span: 24,
            readonly: true,
          },
          {
            label: "收货地址",
            prop: "address",
            type: "textarea",
            span: 24,
            readonly: true,
          },
        ],
        group: [
          {
            icon: "el-icon-user",
            label: "普通快递",
            prop: "group1",
            tabsActive: 1,
            column: [
              {
                label: "快递公司",
                prop: "logistics",
                dicUrl: "/mall/orderlogistics/dict/LOGISTICS",
                span: 24,
                type: "select",
                rules: [
                  {
                    required: false,
                    message: "请选择快递公司",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "快递单号",
                prop: "logisticsNo",
                span: 24,
                display: true,
                rules: [
                  {
                    message: "请输入快递单号",
                    trigger: "blur",
                  },
                ],
              },
            ],
          },
          {
            icon: "el-icon-truck",
            label: "专业物流",
            prop: "group2",
            tabsActive: 2,
            column: [
              {
                label: "司机姓名",
                prop: "carName",
                dicUrl: "/mall/orderlogistics/dict/LOGISTICS",
                span: 24,
                display: true,
                rules: [
                  {
                    message: "请输入司机姓名",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "联系电话",
                prop: "carPhone",
                span: 24,
                display: true,
                rules: [
                  {
                    message: "请输入联系电话",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "备注",
                prop: "carRemark",
                type: "textarea",
                span: 24,
                rules: [
                  {
                    message: "例：车牌号码",
                    trigger: "blur",
                  },
                ],
              },
            ],
          },
        ],
      },
      //报价信息选择
      OfferSelectOption: {
        emptyBtn: false,
        column: [
          {
            label: "预计发货日期",
            prop: "estimateDeliveryTime",
            type: "date",
            labelWidth: 120,
            span: 24,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请选择日期",
                trigger: "blur",
              },
            ],
          },
          {
            label: "最迟结款日期",
            prop: "payClosingDate",
            type: "date",
            labelWidth: 120,
            span: 24,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请选择日期",
                trigger: "blur",
              },
            ],
          },
          {
            label: "报价有效期到",
            prop: "quoteClosingDate",
            type: "date",
            labelWidth: 120,
            span: 24,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请选择日期",
                trigger: "blur",
              },
            ],
          },
        ],
        group: [
          {
            icon: "el-icon-tickets",
            label: "发票类型",
            prop: "group2",
            column: [
              {
                label: "发票类型",
                prop: "cascader",
                type: "cascader",
                labelPosition: "left",
                span: 24,
                dicData: DIC,
                readonly: true,
                rules: [
                  {
                    required: true,
                    message: "请选择发票类型",
                    trigger: "blur",
                  },
                ],
              },
            ],
          },
          {
            icon: "el-icon-user",
            label: "付款方式",
            prop: "group1",
            column: [
              {
                label: "下单预付定金",
                prop: "dingjin",
                labelWidth: 120,
                labelPosition: "left",
                type: "text",
                span: 24,
                rules: [
                  {
                    required: true,
                    message: "请填写下单预付定金",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "发货前支付货款",
                prop: "daikuan1",
                labelWidth: 140,
                labelPosition: "left",
                type: "text",
                span: 24,
                rules: [
                  {
                    required: true,
                    message: "请填写发货前支付货款",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "货到验收合格几日内支付",
                prop: "rizhifu1",
                labelWidth: 180,
                labelPosition: "left",
                type: "text",
                span: 24,
                rules: [
                  {
                    required: true,
                    message: "请填写货到验收合格几日内支付",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "货到支付货款",
                prop: "daikuan2",
                type: "text",
                labelWidth: 120,
                labelPosition: "left",
                span: 24,
                rules: [
                  {
                    required: true,
                    message: "请填写货到支付货款",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "质保金",
                prop: "zibaojin",
                type: "text",
                labelPosition: "left",
                span: 24,
                rules: [
                  {
                    required: true,
                    message: "请填写质保金",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "质保金几日内支付",
                prop: "rizhifu2",
                type: "text",
                labelWidth: 140,
                labelPosition: "left",
                span: 24,
                rules: [
                  {
                    required: true,
                    message: "请填写质保金几日内支付",
                    trigger: "blur",
                  },
                ],
              },
              {
                label: "其他说明",
                prop: "remark",
                type: "textarea",
                labelPosition: "left",
                span: 24,
                rules: [
                  {
                    message: "其他说明",
                    trigger: "blur",
                  },
                ],
              },
            ],
          },
        ],
      },
      //资金结算
      moneyDeclreOption: {
        emptyBtn: false,
      },
      dialogRefunds: false,
      orderItemObj: {},
      orderRefunds: {},
      orderRefundsStatusList: [],
      orderRefundsRules: {
        status: [
          { required: true, message: "请选择退款状态", trigger: "change" },
        ],
      },
      orderRefundsSubmitLoading: false,
    };
  },
  created() {},
  mounted: function () {},
  //   watch: {
  //     "form.text1": {
  //       handler(val) {
  //         console.log(val)
  //         var text2 = this.findObject(
  //           this.logisticsOption.group[0].column,
  //           "logistics"
  //         );
  //         if (val === 0) {
  //           text2.rules = [
  //             {
  //               required: true,
  //               message: "请输入内容2",
  //               trigger: "blur"
  //             }
  //           ];
  //         } else {
  //           text2.display = false;
  //           text2.rules = [];
  //         }
  //       },
  //       immediate: true
  //     }
  //   },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.permissions["mall:orderinfo:add"] ? true : false,
        delBtn: this.permissions["mall:orderinfo:del"] ? true : false,
        editBtn: this.permissions["mall:orderinfo:edit"] ? true : false,
        viewBtn: this.permissions["mall:orderinfo:get"] ? true : false,
      };
    },
  },
  methods: {
    orderRefundsSubmit(orderRefunds) {
      this.orderRefunds.id = orderRefunds.id;
      this.$refs["orderRefunds"].validate((valid) => {
        if (valid) {
          this.orderRefundsSubmitLoading = true;
          doOrderRefunds(this.orderRefunds)
            .then((res) => {
              this.orderRefundsSubmitLoading = false;
              getOrderItem(orderRefunds.orderItemId)
                .then((response) => {
                  let orderItemObj = response.data.data;
                  this.handleOrderItemStatus(orderItemObj);
                })
                .catch(() => {
                  this.orderRefundsSubmitLoading = false;
                });
            })
            .catch(() => {
              this.orderRefundsSubmitLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    handleOrderItemStatus(obj) {
      this.dialogRefunds = true;
      this.orderRefunds = {};
      this.orderItemObj = {};
      getOrderItem(obj.id).then((response) => {
        this.orderItemObj = response.data.data;
        let orderRefunds = this.orderItemObj.listOrderRefunds[0];
        this.orderRefundsStatusList = [];
        if (obj.status == "1") {
          //处理退款申请
          if (orderRefunds.status == "1") {
            this.orderRefundsStatusList = [
              {
                label: "同意退款",
                value: "11",
              },
              {
                label: "拒绝退款",
                value: "12",
              },
            ];
          }
        }
        if (obj.status == "2") {
          //处理退货退款申请
          if (orderRefunds.status == "2") {
            this.orderRefundsStatusList = [
              {
                label: "等待退货",
                value: "21",
              },
              {
                label: "拒绝退货退款",
                value: "22",
              },
            ];
          }
          if (orderRefunds.status == "21") {
            this.orderRefundsStatusList = [
              {
                label: "收到退货同意退款",
                value: "211",
              },
              {
                label: "收到退货拒绝退款",
                value: "212",
              },
            ];
          }
        }
      });
    },
    //改价
    handleEditPrice(obj) {
      this.$prompt("请输入价格", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "number",
        inputPattern: /\S/,
        inputErrorMessage: "请输入价格",
      })
        .then(({ value }) => {
          editPrice({
            id: obj.id,
            paymentPrice: value,
          })
            .then((data) => {
              this.getPage(this.page);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    handleClickStatus(tab, event) {
      this.status = tab.name;
      this.page.currentPage = 1;
      this.getPage(this.page);
    },
    openView(row, index) {
      this.tableLoading = true;
      getObj(row.id).then((response) => {
        row.userInfo = response.data.data.userInfo;
        row.app = response.data.data.app;
        row.orderLogistics = response.data.data.orderLogistics;
        this.$refs.crud.rowView(row, index);
        this.tableLoading = false;
      });
    },
    //订单取消
    orderCancel(row, index) {
      var _this = this;
      this.$confirm("是否确认取消此订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        return orderCancel(row.id)
          .then((data) => {
            _this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            _this.getPage(_this.page);
          })
          .catch(function (err) {});
      });
    },
    // 立即报价
    questionPriceN(row, index, done) {
      getOneObj(row.id).then((res) => {
        this.quesList = res.data.data.records;
      });
      getObj(row.id).then((res) => {
        this.userMessage = res.data.data.userMessage;
      });
      this.dialogQuestionPrice = true;
      this.OfferSelectForm.row = row;
    },
    //修改报价
    changeQuestionPrice(row, index, done) {
      getOneObj(row.id).then((res) => {
        this.quesList = res.data.data.records;
      });
      getObj(row.id).then((res) => {
        this.userMessage = res.data.data.userMessage;
      });
      this.dialogChangeQuestionPrice = true;
      this.OfferSelectForm.row = row;
      this.OfferSelectForm.estimateDeliveryTime = row.estimateDeliveryTime;
      this.OfferSelectForm.payClosingDate = row.payClosingDate;
      this.OfferSelectForm.quoteClosingDate = row.quoteClosingDate;
      let remarkInfo2 = JSON.parse(row.remarkInfo2);
      var temp = [];
      var cascader = row.remarkInfo1.split("|");
      var test = DIC.filter(
        (item) => item.label == cascader[0].replace(/\s+/g, "")
      );
      temp.push(test[0].value);
      if (test[0].children) {
        var test2 = test[0].children.filter(
          (item) => item.label == cascader[1].replace(/\s+/g, "")
        );
        temp.push(test2[0].value);
      }
      this.OfferSelectForm.cascader = temp;
      this.OfferSelectForm.dingjin = remarkInfo2.dingjin;
      this.OfferSelectForm.daikuan1 = remarkInfo2.daikuan1;
      this.OfferSelectForm.rizhifu1 = remarkInfo2.rizhifu1;
      this.OfferSelectForm.daikuan2 = remarkInfo2.daikuan2;
      this.OfferSelectForm.zibaojin = remarkInfo2.zibaojin;
      this.OfferSelectForm.rizhifu2 = remarkInfo2.rizhifu2;
      this.OfferSelectForm.remark = row.remark;
    },
    showDialogLogistics(row, index, done) {
      this.logisticsForm.row = row;
      this.logisticsForm.address = row.orderLogistics.address;
      this.logisticsForm.userName = row.orderLogistics.userName;
      this.logisticsForm.telNum = row.orderLogistics.telNum;
      this.dialogLogistics = true;
    },
    //立即报价
    quesPriceNow(row, index, done) {
      questionPrice(this.quesList).then((data) => {
        this.$message({
          showClose: true,
          message: "报价成功",
          type: "success",
        });
        this.getPage(this.page);
        this.dialogQuestionPrice = false;
      });
      this.dialogOfferSelect = true;
      getObj(this.OfferSelectForm.row.id).then((res) => {
        this.OfferSelectForm.row = res.data.data;
      });
    },
    //修改报价
    quesPriceChange(row, index, done) {
      questionPrice(this.quesList).then((data) => {
        this.$message({
          showClose: true,
          message: "报价修改成功",
          type: "success",
        });
        this.getPage(this.page);
        this.dialogChangeQuestionPrice = false;
      });
      this.dialogOfferSelect = true;
      getObj(this.OfferSelectForm.row.id).then((res) => {
        this.OfferSelectForm.row = res.data.data;
      });
    },
    OfferSelect(form, done) {
      let row = this.OfferSelectForm.row;
      // console.log(form)
      row.estimateDeliveryTime = form.estimateDeliveryTime;
      row.payClosingDate = form.payClosingDate;
      row.quoteClosingDate = form.quoteClosingDate;
      row.remark = form.remark;
      row.remarkInfo1 = form.$cascader;
      row.status = "8";
      var remarkInfo2 = {};
      remarkInfo2.dingjin = form.dingjin;
      remarkInfo2.daikuan1 = form.daikuan1;
      remarkInfo2.rizhifu1 = form.rizhifu1;
      remarkInfo2.daikuan2 = form.daikuan2;
      remarkInfo2.zibaojin = form.zibaojin;
      remarkInfo2.rizhifu2 = form.rizhifu2;
      row.remarkInfo2 = JSON.stringify(remarkInfo2);
      putObj(row)
        .then((data) => {
          this.$message({
            showClose: true,
            message: "报价信息选择成功",
            type: "success",
          });
          done();
          this.getPage(this.page);
          this.dialogOfferSelect = false;
        })
        .catch(() => {
          done();
        });
    },
    //图片预览
    openPreview(imgUrl) {
      var imglist = [];
      var temp = {
        url: imgUrl,
      };
      imglist.push(temp);
      this.$ImagePreview(imglist, 0);
    },
    // 资金结算
    moneyDeclre(row, index, done) {
      getObj(row.id).then((res) => {
        this.contract = res.data.data.contract;
      });
      getMoneyDeclre(row.orderNo).then((res) => {
        this.total = res.data.data.total;
        this.moneyDeclreList = res.data.data.records;
        if (this.moneyDeclreList.length != 0) {
          this.moneyDeclreList.forEach((item) => {
            item.picUrl = JSON.parse(item.picUrl);
          });
          // this.picUrl = JSON.parse(this.moneyDeclreList[0].picUrl)
        }
      });
      this.dialogMoneyDeclre = true;
    },
    //拒绝
    refuse(index) {
      this.moneyDeclreList[index].status = "2";
      puthistoryment(this.moneyDeclreList[index]).then((res) => {
        this.$message({
          showClose: true,
          message: "已拒绝",
          type: "success",
        });
        this.dialogMoneyDeclre = false;
      });
    },
    //确认
    confirm(index) {
      this.moneyDeclreList[index].status = "1";
      let list = JSON.parse(JSON.stringify(this.moneyDeclreList));
      list.forEach((item) => {
        item.picUrl = JSON.stringify(item.picUrl);
      });
      puthistoryment(list[index]).then(res=>{
        this.$message({
            showClose: true,
            message: "已确认",
            type: "success"
          });
        this.dialogMoneyDeclre = false;
      })
    },
    //下载合同
    downloadContract(id) {
      if (this.contract) {
        window.location.href = this.contract;
      } else {
        this.$message({
          message: "合同尚未生成请耐心等待！",
          type: "success",
        });
      }
    },
    //全额结清
    declreAll(orderNo) {
      declreAll(orderNo).then((res) => {
        if (res.data.ok) {
          this.$message({
            showClose: true,
            message: "该订单已全额结清！",
            type: "success",
          });
        }
      });
    },
    subMoneyDeclre(from, done) {},
    //提货
    takeGoods(row, index, done) {
      var _this = this;
      this.$confirm("是否确认提货此订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        return takeGoods(row.id)
          .then((data) => {
            _this.$message({
              showClose: true,
              message: "提货成功",
              type: "success",
            });
            _this.getPage(_this.page);
          })
          .catch(function (err) {});
      });
    },
    //选项卡切换
    handelChange(row) {
      this.changeState = row;
      // console.log(this.changeState)
    },
    //发货
    delivery(form, done) {
      let row = this.logisticsForm.row;
      row.status = "2";
      if (this.changeState == 1) {
        (row.logistics = form.logistics), (row.logisticsNo = form.logisticsNo);
      } else {
        //   var otherInfo = {
        // 				sijiname:this.sijiname,//司机姓名
        // 				sijiphone:this.sijiphone,//联系方式
        // 			}
        (row.orderLogistics.otherInfo = form.carName + form.carPhone),
          (row.remark = form.carRemark);
      }
      putObj(row)
        .then((data) => {
          this.$message({
            showClose: true,
            message: "发货成功",
            type: "success",
          });
          done();
          this.getPage(this.page);
          this.dialogLogistics = false;
        })
        .catch(() => {
          done();
        });
    },
    dateChange(date) {
      if (date) {
        this.date = date;
      } else {
        this.date = [];
      }
      this.getPage(this.page);
    },
    searchChange(params, done) {
      params = this.filterForm(params);
      this.paramsSearch = params;
      this.page.currentPage = 1;
      this.getPage(this.page, params);
      done();
    },
    sortChange(val) {
      let prop = val.prop
        ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase()
        : "";
      if (val.order == "ascending") {
        this.page.descs = [];
        this.page.ascs = prop;
      } else if (val.order == "descending") {
        this.page.ascs = [];
        this.page.descs = prop;
      } else {
        this.page.ascs = [];
        this.page.descs = [];
      }
      this.getPage(this.page);
    },
    getPage(page, params) {
      this.tableLoading = true;
      getPage(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            descs: this.page.descs,
            ascs: this.page.ascs,
            status: this.status != "-1" ? this.status : null,
            beginTime: this.date[0],
            endTime: this.date[1],
          },
          params,
          this.paramsSearch
        )
      )
        .then((response) => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.page.currentPage = page.currentPage;
          this.page.pageSize = page.pageSize;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    /**
     * @title 数据删除
     * @param row 为当前的数据
     * @param index 为当前删除数据的行数
     *
     **/
    handleDel: function (row, index) {
      var _this = this;
      this.$confirm("是否确认删除此数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.id);
        })
        .then((data) => {
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          this.getPage(this.page);
        })
        .catch(function (err) {});
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function (row, index, done, loading) {
      putObj(row)
        .then((data) => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          done();
          this.getPage(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function (row, done, loading) {
      addObj(row)
        .then((data) => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
          done();
          this.getPage(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    /**
     * 刷新回调
     */
    refreshChange(page) {
      this.getPage(this.page);
    },
  },
};
</script>
<style lang="less">
.spu-name {
  font-size: 13px;
}

.spec-info {
  margin-top: 10px;
  font-size: 12px;
  color: #7b7b7b;
}
.quesPrice {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px;
  div {
    margin: 10px 0;
    text-align: left;
    height: 20px;
    line-height: 20px;
    input {
      width: 60%;
      height: 100%;
    }
  }
}
.moneyDeclre {
  width: 100%;
  .title {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
  .declreAll {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
  }
  .order-con {
    padding: 20px;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    margin-top: 20px;
    .order-det {
      .order-main {
        .order-price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px auto;
          .pingImg {
            width: 60%;
            height: 100px;
            display: flex;
            justify-content: flex-end;
            img {
              height: 100%;
              border: 1px solid #f1f1f1;
              border-radius: 5px;
              margin-left: 20px;
            }
          }
        }
        .order-btn {
          width: 100%;
          text-align: right;
          margin: 10px auto;
        }
        .order-beizhu {
          width: 100%;
          text-align: right;
          margin: 10px auto;
        }
      }
    }
  }
}
</style>
