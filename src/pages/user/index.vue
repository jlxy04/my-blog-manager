<template>
  <div>
    <div class="query-form-class">
      <Form :model="queryForm"  v-bind:class="{ active: queryClass }" inline >
            <FormItem label="姓名" :label-width="40">
                  <Input v-model="queryForm.name" placeholder="Enter your name..."></Input>
            </FormItem>
            <FormItem label="日期" :label-width="40">
         
                  <DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                
            </FormItem>
            <FormItem >
                <Button type="warning" size="large" @click="queryView()" icon="ios-search">查询</Button>
            </FormItem>
      </Form>
    </div>
    <div>
    <Spin fix v-if="spinShow">
        <Icon type="load-c" size=30 class="demo-spin-icon-load"></Icon>
        <div style="font-size:20px">数据加载中...</div>
    </Spin>
    </div>
    <Button  size="large" @click="modal2 = true" style="margin:0 0 20px 66px;background:#00bcd4;color:#ffffff;width:75px;height:36px;" icon="android-add">新增</Button>
    
    <Table border  ref="selection" :loading="loading" style="margin:0 66px 20px 66px;" :columns="columns7" :data="data6"></Table>
    
    <div style="margin: 10px;overflow: hidden">
        <div style="margin:50px 0 0 550px;">
            <Page :total="total" :current="currentPage" :page-size="pageSize" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer show-elevator show-total></Page>
        </div>
    </div>
    <Modal v-model="modal2" ref="modal2"  >
        <div slot="header" style="font-size:14px;color:#515a6e;text-align:left;font-family:PingFangSC-Regular;">
            <Icon type="information-circled"></Icon>
            <span>添加用户</span>
        </div>
        <div>
            <Form :model="addForm" ref="addForm" :label-width="80" style="margin:12px 0 10px 0;">
              <FormItem label="姓名" prop="name">
                  <Row>
                    <Col span="20">
                    <Input v-model="addForm.name" placeholder="Enter your name..."></Input>
                   </Col>
                  </Row>
              </FormItem>
              <FormItem label="年龄" prop="age">
                    <Row>
                      <Col span="20">
                        <Input v-model="addForm.age" placeholder="Enter your Age..."></Input>
                     </Col>
                  </Row>
              </FormItem>
              <FormItem label="生日" prop="birthday">
                  <Row>
                      <Col span="20">
                          <DatePicker type="date" placeholder="Select date" v-model="addForm.birthday"></DatePicker>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="性别" prop="sex">
                  <RadioGroup v-model="addForm.sex">
                      <Radio label="MEN">男</Radio>
                      <Radio label="WOMEN">女</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="备注" prop="iDesc">
                <Row>
                    <Col span="20">
                        <Input v-model="addForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                    </Col>
                </Row>
              </FormItem>
              
        </Form>
        </div>
    
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=30 class="demo-spin-icon-load"></Icon>
            <div style="font-size:20px">操作进行时...</div>
        </Spin>
    
        <br>
        <div slot="footer" style="text-align:left">
            <Button style="margin:12px 0 12px 30px;background:#00bcd4;color:#ffffff;width:115px;height:36px;" size="large"  @click="createView('addForm','modal2')" >提交</Button>
            <Button style="margin:12px 0 12px 193px;background:#b5c2ca;color:#ffffff;width:115px;height:36px;" size="large"  @click="handleReset('addForm','modal2')"  >取消</Button>
        </div>
    </Modal>

    <Modal v-model="modal12" ref="modal12"  :closable="false"   :mask-closable="false" class-name="vertical-center-modal" >
      <div slot="header" style="font-size:14px;color:#515a6e;text-align:left;font-family:PingFangSC-Regular;">
            <Icon type="information-circled"></Icon>
            <span>编辑用户</span>
        </div>
        <div>
            <Form :model="editForm" ref="editForm" :label-width="80">
            <FormItem label="姓名" hidden prop="id">
                  <Input v-model="editForm.id" ></Input>
              </FormItem>
              <FormItem label="姓名" prop="name">
                <Row>
                    <Col span="20">
                  <Input v-model="editForm.name"  placeholder="Enter your name..."></Input>
                   </Col>
                </Row>
              </FormItem>
               <FormItem label="年龄" prop="age">
                <Row>
                    <Col span="20">
                  <Input v-model="editForm.age" placeholder="Enter your Age..."></Input>
                    </Col>
                </Row>
              </FormItem>
                <FormItem label="生日" prop="birthday">
                  <Row>
                      <Col span="20">
                          <DatePicker  type="date" placeholder="Select date" v-model="editForm.birthday"></DatePicker>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="性别" prop="sex">
                  <RadioGroup v-model="editForm.sex">
                      <Radio label="MEN">男</Radio>
                      <Radio label="WOMEN">女</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="备注" prop="desc">
               <Row>
                      <Col span="20">
                  <Input v-model="editForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                       </Col>
                </Row>
              </FormItem>
        </Form>
        </div>
        
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=30 class="demo-spin-icon-load"></Icon>
            <div style="font-size:20px">操作进行时...</div>
        </Spin>
    
        <br>
        <div slot="footer" style="text-align:center">
            <Button  style="margin:12px 0 12px 30px;background:#00bcd4;color:#ffffff;width:115px;height:36px;" size="large"  @click="modifyView('editForm','modal12')" >提交</Button>
            <Button style="margin:12px 0 12px 193px;background:#b5c2ca;color:#ffffff;width:115px;height:36px;" size="large"  @click="handleReset('editForm','modal12')"  >取消</Button>
        </div>
       
    </Modal>

  </div>
</template>
<script>
    import * as api from "../../api";
    
    export default {
        data () {
            return {
                loading:false,
                queryForm:{
                },
                queryClass:true,
                editForm:{
                    
                },
                total:1,
                currentPage:1,
                pageSize:10,
                addForm: {
                    name: '',
                    age: '',
                    sex: '',
                    birthday: '',
                    desc: ''
                },
                spinShow: false,
                modal10: false,
                modal2: false,
                modal12: false,
                options2: {
                    shortcuts: [
                     {
                            text: '今天',
                            value () {
                                return [new Date(),new Date()];
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return [date,new Date()];
                            }
                        },
                        {
                            text: '一周之内',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '一个月之内',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '三个月之内',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
                columns7: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                     {
                        title: '主键ID',
                        key: 'id'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render: (h, params) => {
                            return h('div', [
                                h('span', (params.row.sex == 'MEN' ? '男' : '女'))
                            ]);
                        }
                    },
                    {
                        title: '生日',
                        key: 'birthday',
                        render: (h, params) => {
                            return h('div', [
                                h('span', this.dateFormat(params.row.birthday))
                            ]);
                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.update(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    
                ]
            }
        },
        created() {
            this.queryListView('', this.currentPage, this.pageSize);
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '用户详情',
                    content: `Name：${this.data6[index].name}
                    <br>Age：${this.data6[index].age}
                    <br>Sex：${this.data6[index].sex == 'MEN' ? '男' : '女'}
                    <br>Birthday：${this.data6[index].birthday}
                    `
                })
            },
            update (index){
              this.modal12=true;  
              this.editForm = {
                id:this.data6[index].id,
                name:this.data6[index].name,
                age:this.data6[index].age,
                sex:this.data6[index].sex,
                birthday:this.dateFormat(this.data6[index].birthday),
                desc:this.data6[index].desc
              }
            },
            remove (index) {
                this.$Modal.confirm({
                    title: '删除确认',
                    content: '<p>确认删除姓名为'+this.data6[index].name+'的数据?</p>',
                    onOk: () => {
                       this.removeView(this.data6[index].id);
                       this.queryListView('', this.currentPage ,this.pageSize);
                    }
                });
            },
            mockTableData1 () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        name: 'James ' + Math.floor(Math.random () * 100 + 1)+'th',
                        age: Math.floor(Math.random () * 20 + 1),
                        sex:'女',
                        address: 'changsha',
                        hobby:'音乐，电影',
                        birthday:'1992-03-09'
                    })
                }
                return data;
            },
            addnew(){
          
            },
            changePage (page) {
                this.currentPage = page;
                this.queryListView('', this.currentPage ,this.pageSize);
            },
            changePageSize(pageSize){
                this.pageSize = pageSize
                this.queryListView('', this.currentPage ,this.pageSize);
            },
            handleReset (name,modal) {
                this.$refs[name].resetFields();
                this.$refs[modal].close();
            },
            //返回 01-12 的月份值   
            getMonth(date){  
                let month = "";  
                month = date.getMonth() + 1; //getMonth()得到的月份是0-11  
                if(month<10){  
                    month = "0" + month;  
                }  
                return month;  
            } ,
            //返回01-30的日期  
            getDay(date){  
                let day = "";  
                day = date.getDate();  
                if(day<10){  
                    day = "0" + day;  
                }  
                return day;  
            } ,
            dateFormat(longTypeDate){  
                let dateType = "";  
                let date = new Date();  
                date.setTime(longTypeDate); 
                dateType = date.getFullYear()+"-"+this.getMonth(date)+"-"+this.getDay(date);//yyyy-MM-dd格式日期
                return dateType;
            } 
            ,
            toArray(value){
              return value.split(',');
            },
             // 查询
            async queryListView(params, page = this.currentPage,pageSize=this.pageSize) {
                try {
                    // this.spinShow = true;
                    let res = await api.UserService.listUserByPage(params, page, pageSize);
                    if (res && res.data) {
                    this.data6 = [].concat(res.data);
                    this.total = res.count;

                    } 
                    this.currentPage = page;
                    this.spinShow = false;                    
                } catch (err) {
                    this.$Message.error(`出错了哦 ${api.handleError(err, "listUserByPage")}`);
                }
            },
            //查询
            async queryView(){
               this.queryListView({"name":this.queryForm.name},1,this.pageSize)
            },
             async removeView(param){
               await api.UserService.deleteUserById(param)
            },
             // 新建
            async createView(name,modal) {
               this.spinShow = true;
               await api.QueryService.create(this.addForm)
               this.spinShow = false;
               this.$refs[name].resetFields();
               this.$refs[modal].close();
               this.$Message.success('新建成功！');
               this.reFreshList()
            },
            //修改
               async modifyView(name,modal) {
               this.spinShow = true;
               await api.QueryService.modify(this.editForm)
               this.spinShow = false;
               this.$refs[name].resetFields();
               this.$refs[modal].close();
               this.$Message.success('修改成功!');
               this.reFreshList()
            },
            
            // 刷新列表 延时处理api数据可能不及时
            reFreshList() {
                this.queryListView('',this.currentPage,this.pageSize);
            }
        }
    }
</script>

<style>
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
.query-form-class{
    margin:40px 0 0 66px
}
.ivu-page-item-active {
    background-color: #00bcd4 !important;
        border-color: #ffffff !important;
}
.ivu-form{
    &.active{
        .ivu-form-item{

            width:240px;
        }
    }
}

.ivu-modal-body{
    .ivu-form-item {
        margin-bottom: 18px !important;
        vertical-align: top;
        zoom: 1;
    }
}
</style>