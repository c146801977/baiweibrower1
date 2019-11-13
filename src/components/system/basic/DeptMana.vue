<template>
    <div style="width: 400px;">
        <el-input
                placeholder="输入部门名称进行搜索..."
                v-model="filterText">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="deps"
                :expand-on-click-node="false"
                :props="defaultProps"
                :render-content="renderContent"
                :filter-node-method="filterNode"
                ref="tree">
        </el-tree>
        <el-dialog
                title="添加部门"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td><el-tag>父部门</el-tag></td>
                        <td><el-tag type="success">{{pname}}</el-tag></td>
                    </tr>
                    <tr>
                        <td><el-tag>部门名称</el-tag></td>
                        <td><el-input v-model="dep.name"></el-input></td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="doAddDep">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DeptMana",
        data() {
            return {
                dialogVisible: false,
                filterText: '',
                dep: {
                    name: '',
                    parentid:-1
                },
                pname: '',
                deps: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
            this.initDeps();
        },
        methods: {
            setDep2Deps(deps, dep) {
                for(let i=0;i<deps.length;i++){
                    let d = deps[i];
                    if (d.id == dep.parentid) {
                        d.children = d.children.concat(dep);
                        return;
                    }else{
                        this.setDep2Deps(d.children, dep);
                    }
                }
            },
            doAddDep() {
                this.postRequest("/system/basic/dep/",this.dep).then(resp=>{
                    if (resp) {
                        this.setDep2Deps(this.deps, resp.obj);
                        this.dialogVisible = false;
                    }
                })
            },
            showAddDepView(data) {
                this.pname = data.name;
                this.dep.parentid = data.id;
                this.dialogVisible = true;
            },
            renderContent(h, { node, data, store }) {
                return (
                    <span class="custom-tree-node" style="display:flex;justify-content:space-between;width:100%">
                    <span>{data.name}</span>
                <span>
                <el-button size="mini" style="margin:2px;padding:2px" type="default" on-click={ () => this.showAddDepView(data) }>添加部门</el-button>
                <el-button size="mini" style="margin:2px;padding:2px" type="danger" on-click={ () => this.remove(node, data) }>删除部门</el-button>
                </span>
                </span>);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initDeps() {
                this.getRequest("/system/basic/dep/").then(resp => {
                    if (resp) {
                        this.deps = resp;
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>