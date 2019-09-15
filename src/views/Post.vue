<template>
  <div style="background-color: #dceffe;width: 100%;margin: 0 auto;position: absolute;top: 0">
    <div>
      <img style="width: 70%" src="../../static/images/default_head.jpg"/>
    </div>
    <div style="width: 70%;background-color: #f0f7ff;margin: -20px auto 20px auto">
      <ul style="padding-top: 10px;list-style: none">
        <li>
          <el-row>
            <el-col :span="6"><div style="background: #146cc5">huhu</div></el-col>
            <el-col :span="18"><div style="background: #fff">haha</div></el-col>
          </el-row>
        </li>
        <li>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="等级"
              width="300">
              <template slot-scope="scope">
                <svg aria-hidden="true"><use :xlink:href="'#el-icon-smile'+scope.row.icon"/> </svg>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="积分">
            </el-table-column>
          </el-table>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Post",
      data(){
          return{
            tableData: [{
              icon: 'chuangxiangqingtongvip',
              address: '<40'
            }, {
              icon:'chuangxiangbaiyinvip',
              address: '40-59'
            }, {
              icon:'chuangxianghuangjinvip',
              address: '60-79'
            }, {
              icon:'chuangxiangzijinvip',
              address: '80-99'
            }, {
              icon:'huaban',
              address: '100-999'
            }, {
              icon:'icon-test',
              address: '>999'
            }]
          }
      }
    }
</script>

<style scoped>
  svg {
    height: 30px;
    width: 150px;
  }
</style>
