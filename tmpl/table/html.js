module.exports = function(name) {
    return `
<div class="main-wrap">

    <h3 class="mb20">标题</h3>

    <div class="mb20 clearfix">
        <div class="mr10 inline-block pull-left">
            <select name="media" v-model="value" data-value='{{
            value}}' bx-name="components/dropdown" mx-change="dropdownChange('value');">
                <option value="">全部所属行业</option>
                <option v-for="item in dropdownlist" value="{{item.id}}">{{item.name}}</option>
            </select>
        </div>
        <div class="search-box pull-right"><span mx-click="search" class="bp-iconfont search-icon cp"></span>
            <input v-model="keyWord" placeholder="请输入品牌名称或ID" />
        </div>
    </div>
    <div>
        <table class="table" bx-name="app/gallery/table/table" style="margin-bottom: 0;">
            <tr>
                <th>数据列名</th>
                <th>数据列名</th>
                <th>数据列名</th>
            </tr>
            <template v-for="item in list">
                <tr :class="{'curr': !$index}">
                    <td>{{item.id}}</td>
                    <td>
                    <span bx-name="components/popover" bx-options="{
            placement: 'right',
            content: '{{item.name || '-'}}'
          }" class="txt-ellipsis" style="max-width:200px">{{item.name}}</span>
                    </td>
                    <td>{{item.value}}</td>
                </tr>
            </template>
            <tr v-if="!list.length">
                <td colspan="3" class="tc">暂无数据</td>
            </tr>
        </table>
    </div>
    <div bx-name="components/pagination" data-total="{{count}}" data-cursor="{{pageNo}}" data-limit="{{pageSize}}" mx-change="changePager()"></div>
</div>
    `
}