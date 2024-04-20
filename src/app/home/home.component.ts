import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RulesListEnum } from '../settings/data.Enum';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  // departmentsList: string[] = ['dept1', 'dept2', 'dept3', 'dept4', 'dept5', 'dept6']
  departmentsList: any = [
    { item_id: 1, item_text: 'dept1' },
    { item_id: 2, item_text: 'dept2' },
    { item_id: 3, item_text: 'dept3' },
    { item_id: 4, item_text: 'dept4' },
    { item_id: 5, item_text: 'dept5' },
    { item_id: 6, item_text: 'dept6' }
  ]

  RulesList: any = [
    { item_id: 1, item_text: 'Set Times To The Nearest Minutes' },
    { item_id: 2, item_text: 'Flag If Not Rostered To Work Today' },
    { item_id: 3, item_text: 'Clock In Before The Start Of Shift' },
    { item_id: 4, item_text: 'Clock Out Before The End Of Shift' },
    { item_id: 5, item_text: 'Adjust To Start Of Shift If Clocked In Before Start Of Shift' },
    { item_id: 6, item_text: 'Adjust To Start Of Shift. If Clocked In After Start Of Shift' },
    { item_id: 7, item_text: 'Adjust. To End Of Shift If Clocked Out Before End Of Shift' },
    { item_id: 8, item_text: 'Adjust To End Of Shift. If Clocked Out After End Of Shift' },
    { item_id: 9, item_text: 'Warn If Punches Are More Than Per Day' },
    { item_id: 10, item_text: 'Calculate Overtime' },
    { item_id: 11, item_text: 'Punches In Out For Lunch' },
    { item_id: 12, item_text: 'Take Out Lunch Automatically' },
    { item_id: 13, item_text: 'Insert Punch For Roster Reason' },
    { item_id: 14, item_text: 'Pay For Public Holidays If Worked The Day Before Or After' },
  ];

  departmentsListSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: false,
    enableCheckAll: false
  };
  RulesListSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: false
  };

  ReasonsList: string[] = [
    "Reason 1",
    "Reason 2",
    "Reason 3",
    "Reason 4",
    "Reason 5",
    "Reason 6",
    "Reason 7",
    "Reason 8",
  ]

  formGroup!: FormGroup

  RulesListEnum = RulesListEnum;
  addButtonDisabled = true

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      ruleName: ['', [Validators.required]],
      departments: ['', [Validators.required]],
      rulesList: ['', [Validators.required]],
      setTime: this.formBuilder.group({
        setTimeFlag: ['not-selected'],
        setTimeMinute: ['', [Validators.required, Validators.min(0)]],
        setTimeDirection: ['not-selected'],
      }),
      flag: ['not-selected'],
      clockIn: this.formBuilder.group({
        clockInFlag: ['not-selected'],
        clockInMinutes: ['', [Validators.required, Validators.min(0)]]
      }),
      clockOut: this.formBuilder.group({
        clockOutFlag: ['not-selected'],
        clockOutMinutes: ['', [Validators.required, Validators.min(0)]]
      }),
      adjustStartBefore: this.formBuilder.group({
        adjustFlag: ['not-selected'],
        adjustMinutes: ['', [Validators.required, Validators.min(0)]]
      }),
      adjustStartAfter: this.formBuilder.group({
        adjustFlag: ['not-selected'],
        adjustMinutes: ['', [Validators.required, Validators.min(0)]]
      }),
      adjustEndBefore: this.formBuilder.group({
        adjustFlag: ['not-selected'],
        adjustMinutes: ['', [Validators.required, Validators.min(0)]]
      }),
      adjustEndAfter: this.formBuilder.group({
        adjustFlag: ['not-selected'],
        adjustMinutes: ['', [Validators.required, Validators.min(0)]]
      }),
      warnPunchCount: ['', Validators.min(0)],
      overTime: this.formBuilder.group({
        overTimeFlag: ['not-selected'],
        overTimeMinutes: ['', [Validators.required, Validators.min(0)]]
      }),
      punchesLunch: this.formBuilder.group({
        punchesLunchFlag: ['not-selected'],
        punchesLunchMinutes: ['', [Validators.required, Validators.min(0)]],
        noLunchBreakTaken: ['not-selected'],
        lunchBreakMoreThan: ['', [Validators.required, Validators.min(0)]],
        lunchBreakLessThan: ['', [Validators.required, Validators.min(0)]],
      }),
      takeOutLunch: this.formBuilder.group({
        Flag: ['not-selected'],
        Minutes: ['', [Validators.required, Validators.min(0)]],
      }),
      insertPunchRoster: ['not-selected'],
      reasonGroup: this.formBuilder.group({
        reason: ['not-selected'],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required]
      }),
      reasonArray: this.formBuilder.array([]),
      payPublicHoliday: this.formBuilder.group({
        Flag: ['not-selected'],
        StartTime: ['', [Validators.required]],
        EndTime: ['', [Validators.required]],
        Days: ['not-selected'],
        Rate: ['not-selected'],
      })
    })
  }


  ngOnInit(): void {
    this.detectChangeInRulesList()
  }

  //getter
  get ruleName() { return this.formGroup.get('ruleName'); }

  get departments() { return this.formGroup.get('departments'); }

  get rulesList() {
    return this.formGroup.get('rulesList') as FormArray;
  }

  get setTime() {
    return this.formGroup.get('setTime');
  }

  get setTimeFlag() {
    return this.setTime?.get("setTimeFlag");
  }
  get setTimeMinute() {
    return this.setTime?.get("setTimeMinute");
  }
  get setTimeDirection() {
    return this.setTime?.get("setTimeDirection");
  }

  get clockIn() {
    return this.formGroup.get('clockIn');
  }
  get clockOut() {
    return this.formGroup.get('clockOut');
  }

  get adjustStartBefore() {
    return this.formGroup.get('adjustStartBefore');
  }

  get adjustStartAfter() {
    return this.formGroup.get('adjustStartAfter');
  }

  get adjustEndBefore() {
    return this.formGroup.get('adjustEndBefore');
  }

  get adjustEndAfter() {
    return this.formGroup.get('adjustEndAfter');
  }

  get warnPunchCount() {
    return this.formGroup.get('warnPunchCount');
  }
  get overTime() {
    return this.formGroup.get('overTime')
  }

  get punchesLunch() {
    return this.formGroup.get('punchesLunch')
  }

  get takeOutLunch() {
    return this.formGroup.get('takeOutLunch')
  }

  get insertPunchRoster() {
    return this.formGroup.get('insertPunchRoster')
  }

  get reasonGroup() {
    return this.formGroup.get('reasonGroup')
  }

  get reasonArray() {
    return this.formGroup.get('reasonArray') as FormArray;
  }

  get payPublicHoliday() {
    return this.formGroup.get("payPublicHoliday")
  }

  addReason() {
    const reason: FormGroup = this.formBuilder.group({
      reason: [this.reasonGroup?.get('reason')?.value, Validators.required],
      startTime: [this.reasonGroup?.get('startTime')?.value, Validators.required],
      endTime: [this.reasonGroup?.get('endTime')?.value, Validators.required]
    })
    if (reason.valid) {
      this.reasonArray.insert(0, reason);
      this.reasonGroup?.reset();
      this.reasonGroup?.get('reason')?.setValue('not-selected')
      this.addButtonDisabled = true
    }
  }

  removeReason(index: number) {
    this.reasonArray.removeAt(index);
  }

  detectChangeInRulesList() {
    this.setTimeFlag?.valueChanges.subscribe((timeFlagVal) => {
      if (timeFlagVal != 'yes') {
        this.setTimeMinute?.setValue(null);
        this.setTimeDirection?.setValue('not-selected');
      }
    })

    this.clockIn?.get('clockInFlag')?.valueChanges.subscribe((value) => {
      if (value != "error" || value != 'wronging') {
        this.clockIn?.get('clockInMinutes')?.setValue(null)
      }
    })

    this.clockOut?.get('clockOutFlag')?.valueChanges.subscribe((value) => {
      if (value != "error" || value != 'wronging') {
        this.clockIn?.get('clockOutMinutes')?.setValue(null)
      }
    })

    this.adjustStartBefore?.get('adjustFlag')?.valueChanges.subscribe((value) => {
      if (value != "yes") {
        this.adjustStartBefore?.get('adjustMinutes')?.setValue(null)
      }
    })

    this.adjustStartAfter?.get('adjustFlag')?.valueChanges.subscribe((value) => {
      if (value != "yes") {
        this.adjustStartAfter?.get('adjustMinutes')?.setValue(null)
      }
    })

    this.adjustEndBefore?.get('adjustFlag')?.valueChanges.subscribe((value) => {
      if (value != "yes") {
        this.adjustEndBefore?.get('adjustMinutes')?.setValue(null)
      }
    })

    this.adjustEndAfter?.get('adjustFlag')?.valueChanges.subscribe((value) => {
      if (value != "yes") {
        this.adjustEndAfter?.get('adjustMinutes')?.setValue(null)
      }
    })

    this.overTime?.get('overTimeFlag')?.valueChanges.subscribe((value) => {
      if (value != "yes") {
        this.overTime?.get('overTimeMinutes')?.setValue(null)
      }
    })

    this.punchesLunch?.get('punchesLunchFlag')?.valueChanges.subscribe((value) => {
      if (value != "yes") {
        this.punchesLunch?.get('punchesLunchMinutes')?.setValue(null);
        this.punchesLunch?.get('noLunchBreakTaken')?.setValue('not-selected');
        this.punchesLunch?.get('lunchBreakMoreThan')?.setValue(null);
        this.punchesLunch?.get('lunchBreakLessThan')?.setValue(null);
      }
    })

    this.takeOutLunch?.get('Flag')?.valueChanges.subscribe((value) => {
      if (value != "yes") {
        this.takeOutLunch?.get('Minutes')?.setValue(null);
      }
    })

    this.reasonGroup?.valueChanges.subscribe((valueChanges) => {
      if (this.reasonGroup?.valid) {
        this.addButtonDisabled = false
      }
    })

    this.payPublicHoliday?.get('Flag')?.valueChanges.subscribe((value) => {
      if (value != 'yes') {
        this.payPublicHoliday?.get('StartTime')?.setValue(null);
        this.payPublicHoliday?.get('EndTime')?.setValue(null);
        this.payPublicHoliday?.get('Days')?.setValue('not-selected');
        this.payPublicHoliday?.get('Rate')?.setValue('not-selected');
      }
    })
  }

  changeRulesList(event: any) {
    this.rulesList.setValue([...event])
  }




  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
