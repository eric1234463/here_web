import { Component, OnInit } from "@angular/core";
import { RecordService } from "../../../services/record";
import { UserService } from "../../../services/user";
import { Factor, Medicine,  } from "../../../services/constant";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-qr-add",
    templateUrl: "./qr-add.component.html",
    styleUrls: ["./qr-add.component.scss"]
})
export class QrAddComponent implements OnInit {
    public form: FormGroup;
    public edit = false;
    public patientId: number;
    public medicines : Medicine[];
    public factors : Factor[];

    constructor(
        public recordService: RecordService,
        public userService : UserService,
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: FormBuilder
    ) {}

    async ngOnInit() {
        this.form = this.formBuilder.group({
            title: ["", Validators.compose([Validators.required])],
            description: ["", Validators.compose([Validators.required])],
            medicines: ["", Validators.compose([Validators.required])],
            factors: ["", Validators.compose([Validators.required])]
        });
        this.factors = await this.recordService.getFactors();
        this.medicines = await this.recordService.getMedicines();
        this.route.params.subscribe(params => {
            if (params) {
                this.patientId = params["id"];
            }
        });
    }

    async update() {
        const user = await this.userService.getUser();
        const payload = {
            record: {
                title: this.form.value.title,
                description: this.form.value.description,
                doctorId: user.id,
                patientId: this.patientId
            },
            factors: this.form.value.factors,
            medicines: this.form.value.medicines
        }
        try {
            const record = await this.recordService.createRecord(payload);
            this.router.navigateByUrl("/qr");
        } catch(e){
            console.log(e);
        }
    }
}
