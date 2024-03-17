import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';
import data from '@/data';

const AssignRoles = ({ id }) => {
	const [selectedRole, setSelectedRole] = useState('admin');
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedSubcategories, setSelectedSubcategories] = useState([]);

	const handleRoleChange = (e) => {
		setSelectedRole(e.target.value);
		setSelectedCategories([]);
		setSelectedSubcategories([]);
	};

	const handleCategoryChange = (e) => {
		const category = e.target.value;
		setSelectedCategories([category]);
	};
	
	const handleSubcategoryChange = (e) => {
		const subcategory = e.target.value;
		if (selectedSubcategories.includes(subcategory)) {
			setSelectedSubcategories(selectedSubcategories.filter(item => item !== subcategory));
		} else {
			setSelectedSubcategories([...selectedSubcategories, subcategory]);
		}
	};
	
	// Function to handle form submission
	const handleSubmitClick = (userId) => {
		Inertia.post('/profile/roles', {
			id: userId,
			role: selectedRole,
			categories: selectedCategories,
			subcategories: selectedSubcategories,
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.error('Error storing categories:', error);
		});
	};

	return (
		<div className="m-4 p-4 bg-gray-200">
			<h1 className='text-red'>Please Don't Select Any Empty Checkbox Or Radio Button For Now</h1>
			<label htmlFor="role" className="block font-bold mb-2">Select Role:</label>
			<select id="role" value={selectedRole} onChange={handleRoleChange} className="border border-gray-300 rounded-md p-2 mb-4">
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select>

			{data[selectedRole] && (
				<>
					<label className="block font-bold mb-2">Select Categories:</label>
					{Object.keys(data[selectedRole].categories).map((categoryKey) => (
						<div key={categoryKey} className="mb-2">
							<input
								type="radio"
								id={categoryKey}
								value={categoryKey}
								onChange={handleCategoryChange}
								className="mr-2"
							/>
							<label htmlFor={categoryKey}>{data[selectedRole].categories[categoryKey].id}</label>
						</div>
					))}
					{selectedCategories.length > 0 && (
						<>
							<label className="block font-bold mb-2">Select Subcategories:</label>
							{selectedCategories.map((categoryKey) => (
								Object.keys(data[selectedRole].categories[categoryKey].subCategories).map((subcategoryKey) => (
									<div key={subcategoryKey} className="mb-2">
										<input
											type="checkbox"
											id={subcategoryKey}
											value={subcategoryKey}
											onChange={handleSubcategoryChange}
											className="mr-2"
										/>
										<label htmlFor={subcategoryKey}>{data[selectedRole].categories[categoryKey].subCategories[subcategoryKey].id}</label>
									</div>
								))
							))}
						</>
					)}

					<div>
						<button onClick={() => handleSubmitClick(id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
					</div>
				</>
			)}
		</div>
	);
};

export default AssignRoles;
