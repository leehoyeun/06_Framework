package edu.kh.todo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data	//getter+settet+toString
@NoArgsConstructor //기본생성자
@AllArgsConstructor//매개변수 생성자
public class Todo {
	private int todoNo; // 할 일 번호
	private String todoTitle;// 할 일 제목
	private String todoContent; // 할 일 내용
	private String complete; //할 일 완료여부("Y","N")
	private String regDate;  //할 일 등록일
	
}
