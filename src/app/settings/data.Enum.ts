export enum RulesList {
  SET_TIMES_NEAREST_MINUTE = "Set Times To The Nearest Minutes",
  FLAG_NOT_ROstered = "Flag If Not Rostered To Work Today",
  CLOCK_IN_BEFORE_SHIFT = "Clock In Before The Start Of Shift",
  CLOCK_OUT_BEFORE_SHIFT = "Clock Out Before The End Of Shift",
  ADJUST_START_SHIFT_BEFORE = "Adjust To Start Of Shift If Clocked In Before Start Of Shift",
  ADJUST_START_SHIFT_AFTER = "Adjust To Start Of Shift. If Clocked In After Start Of Shift",
  ADJUST_END_SHIFT_BEFORE = "Adjust. To End Of Shift If Clocked Out Before End Of Shift",
  ADJUST_END_SHIFT_AFTER = "Adjust To End Of Shift. If Clocked Out After End Of Shift",
  WARN_PUNCH_COUNT = "Warn If Punches Are More Than Per Day",
  CALCULATE_OVERTIME = "Calculate Overtime",
  PUNCHES_LUNCH = "Punches In Out For Lunch",
  TAKE_OUT_LUNCH = "Take Out Lunch Automatically",
  INSERT_PUNCH_ROSTER = "Insert Punch For Roster Reason",
  PAY_PUBLIC_HOLIDAY = "Pay For Public Holidays If Worked The Day Before Or After",
}
