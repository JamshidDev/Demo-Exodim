<template >
    <div class="grid py-2 px-2">
    <div class="col-6">
      <h6 class="text-lg p-2 uppercase">
        Intizomiy jazolanganlar
        <span class="text-red-500">({{ totalPage }})</span>
      </h6>
    </div>
    <div class="col-6 flex justify-content-end align-items-center">
      <InputText
        type="text"
        v-model="searchCadryName"
        placeholder="Ism orqali qidiruv"
        class="p-inputtext-sm"
        @keyup.enter="searchByName()"
      />
    </div>

    <div class="col-12"  v-show="!loader">
      <div class="grid">
        <div
         
          class="col-12 xl:col-3 lg:col-3 md:col-3 sm:col-4 p-3"
          style="box-sizing: border-box; "
          v-for="cadry in punishmentList"
          :key="cadry"
        >
          <div
            class="
              grid
              shadow-1
              border-1
              surface-0
              border-200
              py-4
              px-3
              relative
              overflow-hidden
            "
            style="min-height: 221px;"
          >
            <div class="col-12 flex justify-content-center">
              <Avatar
                :image="cadry.photo"
                v-badge.danger="cadry.disciplinary_count"
                size="large"
                shape="circle"
              />
            </div>
            <div class="col-12">
              <h6 class="text-800 text-center font-semibold">
                {{ cadry.fullname }}
              </h6>
              <h6
                class="
                  text-800
                  font-medium
                  my-0
                  text-center text-sm text-yellow-500
                "
              >
                <i class="pi pi-info-circle text-yellow-500 pr-1"></i>
                {{cuteString(cadry.staff? cadry.staff.staff_full : "")  }}

              </h6>
            </div>
            <div class="col-12 flex justify-content-center">
              <Button
                label="Batafsil"
                @click="openDialog(cadry.disciplinaries)"
                icon="pi pi-info-circle"
                class="p-button-sm p-2 p-button-danger"
              />
            </div>
            <div
              class="
                page_numeric
                border-1 border-red-500
                bg-red-500
                text-white
                border-circle
                text-base
                font-medium
              "
            >
              {{ cadry.number }}
            </div>
          </div>
        </div>
        <div class="col-12"  v-show="totalPage>0" >
          <table-pagination
            :total_page="totalPage"
            @pagination="changePagination($event)"
          ></table-pagination>
        </div>
      </div>
    </div>
    <div class="col-12" v-show="loader" >
      <card-loader></card-loader>
    </div>

    <div class="col-12">
      <Dialog
        v-model:visible="dialogIncentice"
        :breakpoints="{
          '1960px': '30vw',
          '1600px': '40vw',
          '1200px': '70vw',
          '960px': '80vw',
          '640px': '90vw',
        }"
        :style="{ width: '50vw' }"
        :modal="true"
      >
        <template #header>
          <h6 class="uppercase text-lg text-red-500 font-medium">
            Jazolanganlar
          </h6>
        </template>
        <div class="grid">
          <div class="col-12" v-for="item in punishments" :key="item">
            <h6 class="my-1">
              Prikaz raqami:<span class="text-yellow-500 pl-1">{{
                item.number
              }}</span>
            </h6>
            <h6 class="my-1">
              Jazo turi:
              <span class="text-yellow-500 pl-1">{{ item.type_action }}</span>
            </h6>
            <h6 class="my-1">
              Sababi:<span class="text-yellow-500 pl-1">{{
                item.reason_action
              }}</span>
            </h6>
          </div>
        </div>
        <template #footer> </template>
      </Dialog>
    </div>
  </div>
</template>
<script>
import punishmentService from '@/service/servises/punishmentService'
import formatter from '@/util/formatter'
import TablePagination from '@/components/Pagination/TablePagination'
import CardLoader from "@/components/loaders/CardLoader";
export default {
    components:{
        TablePagination,
        CardLoader,
    },
    data(){
        return{
            loader:false,
            punishmentList:[],
            params:{
                page:1,
                per_page:10,
                search:null,
            },
            searchCadryName:null,
            formatter,
            totalPage:0,

            dialogIncentice: false,
      punishments: [],
        }
    },
    methods:{
        get_Punishment(params, loader){
          this.controlLoader(loader)
            punishmentService.get_punishment(params).then((res)=>{
                console.log(res.data);
                this.totalPage = res.data.cadries.pagination.total
                let number = (this.params.page - 1) * this.params.per_page;
          res.data.cadries.data.forEach((item) => {
            number++;
            item.number = number;
          });

                this.punishmentList = res.data.cadries.data
                this.controlLoader(false)
            }).catch((error)=>{
                console.log(error);
            })
        },
        searchByName(){
            this.params.search = this.searchCadryName;
            this.get_Punishment(this.params, true)
        },
        changePagination(event) {
      this.params.page = event.page;
      this.params.per_page = event.per_page;
      this.get_Punishment(this.params, true)
    },
   
        openDialog(item) {
      this.punishments = item;
      this.dialogIncentice = true;
    },
        cuteString(item){
      if(item.length>130){
        return `${item.slice(0, 100,)}...`
      }else{
        return item
      }
      
    },
    controlLoader(item) {
      this.loader = item;
    },
    },
    created(){
        this.get_Punishment(this.params, true)
    }
}
</script>
<style lang="scss" scoped>
    .page_numeric {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -50px;
  left: -50px;
  padding-top: 60px;
  padding-left: 60px;
}
</style>