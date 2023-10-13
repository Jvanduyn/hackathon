import pandas as pd
import pickle
import os
import sys

with open(os.getcwd() + '/src/predict/employee_salary_model.pkl', 'rb') as file:
    model = pickle.load(file)

def predict_salary(role):
    role_df = pd.DataFrame(0, columns=model.feature_names_in_, index=[0])
    role_df['role_' + role] = 1

    predicted_salary = model.predict(role_df)

    print(predicted_salary[0])

predict_salary(sys.argv[1])
