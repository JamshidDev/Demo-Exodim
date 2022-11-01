<template >
  <div class="grid card py-4" v-if="barLoader">
    <div class="col-12">
      <progress-bar-loader></progress-bar-loader>
    </div>
  </div>

  <div  class="grid card xl:p-4 lg:p-2 pt-4 px-0" v-if="!barLoader">
    <div class="col-12 py-1 px-0 mb-6" v-show="cadryRelativeList.length==0">
      <add-button :title="'Yaqin qarindoshlarini qo\'shish'" @click="addItem()"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!cadryRelativeList.length==0">
      <DataTable
        :value="cadryRelativeList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        @rowReorder="onRowReorder"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
              Yaqin qarindoshlari
              </h5>
            </div>
            <div class="col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-plus-circle"
                class="p-button-info p-button-sm"
                label="Qo'shish"
                v-tooltip.bottom="`Bilim yurtini qo'shish`"
                @click="addItem()"
              />
            </div>
          </div>
        </template>
        <Column :rowReorder="true" style="min-width:30px; width:50px;" class="text-center" :reorderableColumn="false" />
        <Column style="min-width:100px; width:150px;">
          <template #header>
            <div class="text-800 font-semibold">Qarindoshligi</div>
          </template>
          <template #body="slotProps">
            <div
              class="text-center cursor-pointer font-semibold"
            >
              {{ slotProps.data.relative.name}}
            </div>
          </template>
        </Column>
        <Column  style="min-width:150px;">
          <template #header>
            <div class="text-800 font-semibold">F.I.SH</div>
          </template>
          <template #body="slotProps">
            <div
              class="text-center cursor-pointer font-semibold"
            >
              {{ slotProps.data.fullname }}
            </div>
          </template>
        </Column>

        <Column style="min-width:200px; width:300px;">
          <template #header>
            <div class="text-800 font-semibold">Tugilgan yili va joyi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.birth_place }}
            </div>
          </template>
        </Column>
        <Column style="min-width:200px; width:300px;">
          <template #header>
            <div class="text-800 font-semibold">Kasbi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.post }}
            </div>
          </template>
        </Column>
        <Column style="min-width:300px; width:400px;">
          <template #header>
            <div class="text-800 font-semibold">Yashash manzili</div>
          </template>
          <template #body="slotProps">
            <div
              class="
                font-semibold
              "
            >
              {{ slotProps.data.address }}
            </div>
          </template>
        </Column>
        <Column :exportable="false" style="min-width:100px; width:150px;">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editRelative($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteRelative($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    
    <div class="col-12">
      <Toast position="bottom-right" />
      <Dialog
        v-model:visible="relativeDialog"
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
          <h6 class="uppercase text-lg text-blue-500 font-medium">
            {{
              relativeDialogType
                ? "Ma'lumot qo'shish"
                : "Ma'lumotni tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Qarindoshligi</h6>
            <Dropdown
                id="bornRegion"
                v-model="relative_id"
                :options="relativeList"
                optionLabel="name"
                optionValue="id"
                placeholder="Tanlang"
                class="w-full font-semibold"
              />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">F.I.SH</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="relative_fullName"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Tug'ilgan yili va joyi</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiritng"
              id="employeePhone"
              v-model="relative_birthday"
            />
          </div>
         
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Kasbi</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="relative_job"
              :autoResize="true"
              rows="1"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Hozirda yashash manzili</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="relative_adress"
              :autoResize="true"
              rows="1"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEdit()"
              />
            </div>
          </div>
        </template>
      </Dialog>

    </div>

  </div>
</template>
<script>
  import DeleteButton from '../buttons/DeleteButton.vue';
  import EditButton from '../buttons/EditButton.vue';
import employeeRelative from '../../service/servises/employeeRelative';
  import ProgressBarLoader from "../loaders/ProgressBarLoader.vue";
  import AddButton from '../buttons/AddButton.vue';
export default {
  components:{
    DeleteButton, EditButton,ProgressBarLoader,AddButton,
  },
  data(){
    return{
      barLoader:false,

     cadryRelativeList:[],
     relativeList:[],
     relative_id:null,
     relativeDialogType:true,
     relativeDialog:false,
     relative_fullName:"",
     relative_birthday:"",
     relative_job:"",
     relative_adress: "",
     cadry_relative_id:null,


    }
  },
  methods:{
    get_cadryRelative(id, loader){
      this.controlLoader(loader)
      employeeRelative.get_CadryRelative({id}).then((res)=>{
        console.log(res.data.relatives);
        console.log(res.data.cadryRelatives);
        this.cadryRelativeList = res.data.cadryRelatives;
        this.relativeList = res.data.relatives;
        this.controlLoader(false)
      }).catch((error)=>{
        this.controlLoader(false)
        console.log(error);
      })
    },

    addItem(){
      this.relative_id = null,
      this.relative_fullName=""
      this.relative_birthday = "",
      this.relative_job=""
      this.relative_adress = "",
      this.relativeDialogType = true
      this.controlDialog(true)

    },
    editRelative(event){
      this.cadry_relative_id = event.id
      this.relative_id = event.relative.id,
      this.relative_fullName=event.fullname
      this.relative_birthday = event.birth_place
      this.relative_job=event.post
      this.relative_adress = event.address,
      this.relativeDialogType = false
      console.table(event);
      this.controlDialog(true)
    },

    addAndEdit(){
      this.controlDialog(false)
      let data ={
        relative_id:this.relative_id,
        fullname: this.relative_fullName,
        birth_place:this.relative_birthday,
        post:this.relative_job,
        address: this.relative_adress,
      }

      if(this.relativeDialogType){
        employeeRelative.create_CadryRelative({id:this.$route.params.id, data}).then((res)=>{
          this.get_cadryRelative(this.$route.params.id, false)
          this.$toast.add({
              severity: "success",
              summary: "Muvofaqqiyatli bajarildi",
              detail: "Qo'shildi",
              life: 2000,
            });
        }).catch((error)=>{
          console.log(error);
        })
       
      }else{
        employeeRelative.update_CadryRelative({relative_id:this.cadry_relative_id, data }).then((res)=>{
          this.get_cadryRelative(this.$route.params.id, false)
          this.$toast.add({
              severity: "success",
              summary: "Muvofaqqiyatli bajarildi",
              detail: "Tahrirlandi",
              life: 2000,
            });
        }).catch((error)=>{
          console.log(error);
        })
      }
    },

    deleteRelative(id){
      employeeRelative.delete_CadryRelative({relative_id:id}).then((res)=>{
        this.get_cadryRelative(this.$route.params.id, false)
        this.$toast.add({
              severity: "success",
              summary: "Muvofaqqiyatli bajarildi",
              detail: "O'chirildi",
              life: 2000,
            });
        }).catch((error)=>{
          console.log(error);
        })
    },
    onRowReorder(event){
      this.cadryRelativeList = event.value;
      let orders = []
      event.value.forEach((item, index)=>{
        orders.push({
          cadry_relative_id: item.id,
          position:index+1
        })
      })
      employeeRelative.sortable_CadryRelative({orders}).then((res)=>{
        console.log(res);
      }).catch((error)=>{
        console.log(error);
      })
    },
    controlDialog(item){
      this.relativeDialog = item
    },
    controlLoader(item){
      this.barLoader = item
    }
  },

  created(){
   this.get_cadryRelative(this.$route.params.id, true)
  }

  
};
</script>
