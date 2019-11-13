<template>
    <div>
        <div></div>
        <div style="margin-top: 10px">
            <el-table
                    :data="foods"
                    border
                    align="center"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="编号"
                        align="center"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="菜品名称"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="菜品图片">
                    <template slot-scope="scope">
                        <el-upload
                                class="upload-demo"
                                :data="scope.row"
                                :show-file-list="true"
                                :on-success="onSuccess"
                                :on-error="onError"
                                action="/food/mana/update">
                            <img :src="scope.row.icon" style="width: 72px;height: 72px;border-radius: 10px" alt="" title="点击修改菜品图片">
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        align="center"
                        label="菜品价格">
                </el-table-column>
                <el-table-column align="center"
                        prop="pricetype"
                        label="价格类型">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="菜品状态">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.state==1"
                                    active-text="上架"
                                    inactive-text="下架">
                            </el-switch>
                        </template>
                </el-table-column >
                <el-table-column
                            prop="remark"
                            align="center"
                            label="备注">
                </el-table-column>
                <el-table-column
                        prop="preferential"
                        align="center"
                        label="折扣">
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FoodMana",
        data(){
            return{
                foods: [],
                total: -1,
                page: 1,
                pageSize: 10
            }
        },
        mounted(){
            this.initFoods();
        },
        methods:{
            onSuccess(response, file, fileList) {
                this.initFoods();
            },
            onError(err, file, fileList) {

            },
            sizeChange(newSize) {
                this.pageSize = newSize;
                this.initFoods();
            },
            currentChange(newPage) {
                this.page = newPage;
                this.initFoods();
            },
            initFoods(){
                this.getRequest("/food/mana/?page=" + this.page + "&size=" + this.pageSize).then(resp => {
                    if (resp){
                        // alert(JSON.stringify(resp));
                       this.foods = resp.data;
                        this.total = resp.total;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>