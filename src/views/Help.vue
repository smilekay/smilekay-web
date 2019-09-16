<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1" @select="onSelect">
          <el-menu-item index="1">联系我</el-menu-item>
          <el-menu-item index="2">积分等级</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div id="contact">
          <h3 class="gray">欢迎各位同学相互讨论学习</h3>
          <span class="left gray">QQ：419620437</span>
          <br/>
          <span class="left gray">WX：nimingtao001</span>
        </div>
        <div id="level_tb" class="hide">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              label="等级"
              width="300">
              <template slot-scope="scope">
                <svg aria-hidden="true">
                  <use :xlink:href="'#el-icon-smile'+scope.row.icon"/>
                </svg>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="积分">
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Help",
    data() {
      return {
        tableData: [{
          icon: 'chuangxiangqingtongvip',
          address: '<40'
        }, {
          icon: 'chuangxiangbaiyinvip',
          address: '40-59'
        }, {
          icon: 'chuangxianghuangjinvip',
          address: '60-79'
        }, {
          icon: 'chuangxiangzijinvip',
          address: '80-99'
        }, {
          icon: 'huaban',
          address: '100-999'
        }, {
          icon: 'icon-test',
          address: '>999'
        }]
      }
    },
    methods: {
      onSelect(index, indexPath) {
        if (index == '1') {
          $('#contact').removeClass('hide')
          $('#level_tb').addClass('hide')
        } else {
          $('#level_tb').removeClass('hide')
          $('#contact').addClass('hide')
        }
      }
    }
  }
</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    position: absolute;
    top: 60px;
  }

  .el-main {
    color: #333;
    position: absolute;
    top: 60px;
    left: 200px;
    margin-left: 10px;
    z-index: 1;
  }

  svg {
    height: 30px;
    width: 150px;
  }

  .hide {
    display: none;
  }

  .gray{
    color: #909399;
  }
</style>
